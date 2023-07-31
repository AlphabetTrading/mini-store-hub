import { Address } from "./address";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  userProfile?: UserProfile;
  warehouse: { id: string; name: string};
  retailShop: { id: string; name: string};
};
type UserProfile = {
  address: Address;
  photoUrl: string;
};

export enum UserRole {
  ADMIN = "ADMIN",
  RETAIL_SHOP_MANAGER = "RETAIL_SHOP_MANAGER",
  USER = "USER",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
}
