export interface Product {
  id: string;
  serialNumber: string;
  unit: Unit;
  name: string;
  description: string;
  category: { id: string; name: string };
  activePrice: { id: string; purchasedPrice: number; price: number };
  priceHisotry: {
    id: string;
    purchasedPrice: number;
    price: number;
    createdAt: Date;
  }[];
}

export interface WarehouseStock {
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
