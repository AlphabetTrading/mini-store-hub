import { Address } from "./address";
import { Product, Unit } from "./product";
import { StockItem } from "./stock-item";
import { User } from "./user";

export interface Warehouse {
  id: string;
  name: string;
  amharicName: string;
  address?: Address;
  warehouseManager: User;
  createdAt: Date;
  warehouseStock: StockItem[];
  status?: boolean;
}

export interface LowStockItemsWarehouse {
  product: Product;
  quantity: number;
  maxQuantity: number;
}
