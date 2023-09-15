import { Category } from "./categories";

export interface Product {
  id: string;
  serialNumber: string;
  unit: Unit;
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  category: Category;
  activePrice: PriceHistory;
  priceHistory: PriceHistory[];
  saleTransactionItem?: SaleTransactionItem[];
  images: string[];
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
