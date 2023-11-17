import { StockItem } from "./stock-item";
import { RetailShop } from "./retail-shop";
import { Warehouse } from "./warehouse";

export interface GoodsTransfer {
  id: string;
  transferType: TransferType;
  createdAt: Date;
  retailShop?: RetailShop;
  goods: StockItem[];
  destinationWarehouse?: Warehouse;
  sourceWarehouse?: Warehouse;
}

export enum TransferType {
  WarehouseToRetailShop = "WarehouseToRetailShop",
  WarehouseToWarehouse = "WarehouseToWarehouse",
}
