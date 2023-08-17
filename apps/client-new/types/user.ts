import { Address } from "./address";
import { RetailShop } from "./retail-shop";
import { Warehouse } from "./warehouse";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  amharicFirstName: string;
  amharicLastName: string;
  username: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  userProfile?: UserProfile;
  warehouse: Warehouse[];
  retailShop: RetailShop[];
  password?: string;
  gender: Gender;
  isActive: boolean;
};
type UserProfile = {
  address?: Address;
  photoUrl?: string;
  idUrl?: string;
};

export enum UserRole {
  ADMIN = "ADMIN",
  RETAIL_SHOP_MANAGER = "RETAIL_SHOP_MANAGER",
  USER = "USER",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
}
export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}
