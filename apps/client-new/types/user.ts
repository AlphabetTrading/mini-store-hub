import { Address } from "./address";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  role: Role;
  userProfile?: UserProfile;
  warehouse: { id: string };
};
type UserProfile = {
  address: Address;
};

export enum Role {
  ADMIN = "ADMIN",
  RETAIL_SHOP_MANAGER = "RETAIL_SHOP_MANAGER",
  USER = "USER",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
}
