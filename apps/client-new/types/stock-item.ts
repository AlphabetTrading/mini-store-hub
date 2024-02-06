import { PriceHistory, Product } from "./product";

export interface StockItem {
    quantity: number;
    product: Product;
    activePrice?:PriceHistory;
  }
export interface SelectedStockItem {
    stockItem: StockItem;
    selectedQuantity: number;
}
export interface RetailShopStockItem{
  id:string;
  product:Product;
  createdAt:Date;
  quantity:number;
  activePrice:PriceHistory;
  priceHistory:PriceHistory[];

}
export interface SelectedRetailShopStockItem {
  retailShopStockItem: RetailShopStockItem;
  selectedQuantity: number;
}
  