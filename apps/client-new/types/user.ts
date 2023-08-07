import { Address } from "./address";
import { RetailShop } from "./retail-shop";
import { Warehouse } from "./warehouse";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  userProfile?: UserProfile;
  warehouse: Warehouse[];
  retailShop: RetailShop[];
};
type UserProfile = {
  address?: Address;
  photoUrl?: string;
  idUrl?:string;
};

export enum UserRole {
  ADMIN = "ADMIN",
  RETAIL_SHOP_MANAGER = "RETAIL_SHOP_MANAGER",
  USER = "USER",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
}
