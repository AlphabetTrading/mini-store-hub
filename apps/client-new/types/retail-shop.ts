import { Address } from "./address";

export type RetailShop = {
  id: string;
  name: string;
  retailShopManager: {
    id: string;
    firstName: string;
    lastName: string;
  };
  address: Address;
};
