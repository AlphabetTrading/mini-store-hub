import { Address } from "./address";
import { StockItem } from "./product";
import { User } from "./user";

export interface Warehouse{
    id: string;
    name: string;
    address?:Address;
    warehouseManager: User;
    createdAt:Date;
    warehouseStock:StockItem[];
}