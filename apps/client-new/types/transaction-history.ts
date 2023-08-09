import { RetailShop } from "./retail-shop";

export interface TransactionHistory {
  id: string;
  transferType: TransferType;
  createdAt: Date;
  retailShop?: RetailShop;
}

export enum TransferType {
  WarehouseToRetailShop = "WarehouseToRetailShop",
  WarehouseToWarehouse = "WarehouseToWarehouse",
}
