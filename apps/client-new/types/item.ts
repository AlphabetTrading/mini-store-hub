export interface Item {
  id: string;
  serialNumber: string;
  unit: string;
  name: string;
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
  product: Item;
}
