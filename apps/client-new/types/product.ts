import { Meta } from "./common";

export interface Product {
  id: string;
  serialNumber: string;
  unit: Unit;
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  category: { id: string; name: string };
  activePrice: PriceHistory;
  priceHistory: PriceHistory[];
  saleTransactionItem?: SaleTransactionItem[];
}

export interface SaleTransactionItem {
  id: string;
  subTotal: number;
  quantity: number;
}

export interface PriceHistory {
  id: string;
  purchasedPrice: number;
  price: number;
  createdAt: Date;
}

export interface StockItem {
  quantity: number;
  product: Product;
}

export enum Unit {
  BAG = "BAG",
  BOTTLE = "BOTTLE",
  BOX = "BOX",
  KG = "KG",
  LITER = "LITER",
  METER = "METER",
  METER_SQUARE = "METER_SQUARE",
  OTHER = "OTHER",
  PIECES = "PIECES",
}
