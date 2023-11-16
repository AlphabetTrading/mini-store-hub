import { Product } from "./product";

export interface StockItem {
    quantity: number;
    product: Product;
  }
  export interface SelectedStockItem {
    stockItem: StockItem;
    selectedQuantity: number;
  }
  