import { RetailShopStockItem } from "./stock-item";

export interface RetailShopTransactionItem {
    id:string;
    createdAt:Date;
    subTotal:number;
    quantity:number;
    retailShopStock:RetailShopStockItem;
}

export interface SelectedRetailShopSaleTransactionItem {
    saleTransactionItem: RetailShopTransactionItem;
    selectedQuantity: number;
  }

  export interface RetailShopSaleTransaction {
    id:string;
    createdAt:Date;
    total:number;
    retailShopTransactionItems:RetailShopTransactionItem[];
  }
  