const form = document.querySelector('#add-task-form');
const inputNode = document.querySelector('#task-name');
const submitBtn = document.querySelector('#submit-task-btn');
const errorMsg = document.querySelector('#error-msg');
const taskList = document.querySelector('#task-list');
const spinner = document.querySelector('#loading-spinner');
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// 1. Desenare rând în DOM cu data-testid="delete-btn-${id}"
const deseneazaTaskInDOM = (id, titlu) => {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <span class="task-title">${titlu}</span>
    <button class="btn-delete" data-testid="delete-btn-${id}">Șterge</button>
  `;
  taskList.appendChild(li);
};

// 2. GET: 5 task-uri inițiale și ascundere spinner
const incarcaDateServer = async () => {
  try {
    const response = await fetch(`${API_URL}?_limit=5`);
    const data = await response.json();
    spinner.style.display = 'none';
    data.forEach((task) => deseneazaTaskInDOM(task.id, task.title));
  } catch (error) {
    console.error(error);
  }
};
incarcaDateServer();

// 3. Validare live input
inputNode.addEventListener('input', () => {
  if (inputNode.value.trim().length > 0) {
    submitBtn.disabled = false;
    errorMsg.style.display = 'none';
  } else {
    submitBtn.disabled = true;
    errorMsg.style.display = 'block';
  }
});

// 4. POST: Salvare task nou pe rețea
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskTitle = inputNode.value.trim();
  if (!taskTitle) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Se salvează...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle, completed: false, userId: 1 }),
    });

    if (response.status === 201) {
      const newTask = await response.json();
      deseneazaTaskInDOM(newTask.id, newTask.title);
      inputNode.value = '';
    }
  } catch (error) {
    console.error(error);
  } finally {
    submitBtn.textContent = 'Salvează Task';
    submitBtn.disabled = true;
  }
});

// 5. Event Delegation: toggle .completed și DELETE pe rețea
taskList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('task-title')) {
    e.target.classList.toggle('completed');
  }

  if (e.target.classList.contains('btn-delete')) {
    const deleteBtn = e.target;
    const randTask = deleteBtn.closest('.task-item');
    const testId = deleteBtn.getAttribute('data-testid') || '';
    const taskId = testId.split('-')[2] || '1';

    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      randTask.remove();
    }
  }
});

// 6. Chaos Mode: Pop-up cu data-testid="close-promo-btn"
const initChaosMode = () => {
  setTimeout(() => {
    const modal = document.createElement('div');
    modal.className = 'overlay-modal';
    modal.innerHTML = `
      <div class="promo-box">
        <h3>Ofertă Specială! 🚀</h3>
        <p>Apasă butonul de mai jos pentru a continua testarea.</p>
        <button class="btn-close-promo" data-testid="close-promo-btn">Nu, mulțumesc</button>
      </div>
    `;
    const closeBtn = modal.querySelector('.btn-close-promo');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    document.body.appendChild(modal);
  }, 3000);
};
initChaosMode();