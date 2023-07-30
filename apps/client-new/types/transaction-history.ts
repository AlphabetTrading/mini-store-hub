import { RetailShop } from "./retail-shop";

export interface TransactionHistory {
  transferType: TransferType;
  createdAt: Date;
  retailShop: RetailShop;
}

export enum TransferType {
  WarehouseToRetailShop = "WarehouseToRetailShop",
  WarehouseToWarehouse = "WarehouseToWarehouse",
}
