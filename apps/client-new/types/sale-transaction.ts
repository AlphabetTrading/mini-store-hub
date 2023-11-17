import { PriceHistory, Product } from "./product";

export interface SaleTransactionItem {
  id?: string;
  quantity: number;
  product: Product;
  subTotal?: number;
  soldPriceHistory?: PriceHistory;
}

export interface SaleTransaction {
  id: string;
  createdAt: Date;
  totalPrice: number;
  saleTransactionItems: SaleTransactionItem[];
}

export interface SelectedRetailShopSaleTransaction {
  saleTransactionItem: SaleTransactionItem;
  selectedQuantity: number;
}


