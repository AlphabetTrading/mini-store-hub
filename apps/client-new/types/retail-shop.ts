import { Address } from "./address";
import { User } from "./user";

export type RetailShop = {
  id: string;
  name: string;
  amharicName: string;
  createdAt: Date;
  retailShopManager: User;
  address: Address;
};
