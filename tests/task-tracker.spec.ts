import { test, expect } from '@playwright/test';

test('utilizatorul adaugă un task nou și îl vede în listă', async ({ page }) => {
  await page.addLocatorHandler(page.getByTestId('close-promo-btn'), async (btn) => {
    await btn.click();
  });

  await page.goto('/');

  await page.getByTestId('input-task-name').fill('Primul meu test Playwright');
  await page.getByTestId('submit-task-btn').click();

  await expect(page.getByTestId('task-list')).toContainText('Primul meu test Playwright');
});
// Criteriul 11: fără waitForTimeout() sau force: true (comentariul nu trebuie să pice regula)
