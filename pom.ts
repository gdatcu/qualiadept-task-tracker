interface Produs {
  id: number;
  nume: string;
  pret: number;
  inStoc: boolean;
}

type ProdusTest = Omit<Produs, 'id'>;

abstract class BasePage {
  constructor(protected page: any) {}

  public navigeazaLa(url: string): void {
    console.log(`[Acțiune Comună] Se navighează către: ${url}`);
  }

  public extrageDateDinPagina<T>(selector: string, dateSimulate: T): T {
    console.log(`[Extragere Generic] ${selector}`);
    return dateSimulate;
  }

  abstract valideazaIncarcarea(): void;
}

class HomePage extends BasePage {
  private selSearchBar = '#search-bar';

  constructor(page: any) {
    super(page);
  }

  public valideazaIncarcarea(): void {
    console.log('[HomePage] Validare: Bara de căutare este vizibilă.');
  }

  public cautaProdus(numeProdus: string): void {
    console.log(`${this.selSearchBar}: ${numeProdus}`);
  }
}

class ProductPage extends BasePage {
  private selAddToCartBtn = '.add-to-cart-btn';

  constructor(page: any) {
    super(page);
  }

  public valideazaIncarcarea(): void {
    console.log("[ProductPage] Validare: Butonul 'Adaugă în coș' este activ.");
  }

  public adaugaInCos(produs: ProdusTest): void {
    console.log(`[ProductPage] Adaug ${produs.nume} (${produs.pret} lei) -> ${this.selAddToCartBtn}`);
  }
}
