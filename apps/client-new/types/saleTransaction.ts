import { PriceHistory, Product } from "./product";

export interface SaleTransactionItem {
  id: string;
  quantity: number;
  product: Product;
  subTotal: number;
  soldPrice: PriceHistory;
}

export interface SaleTransaction {
  id: string;
  createdAt: Date;
  totalPrice: number;
  saleTransactionItems: SaleTransactionItem[];
}
