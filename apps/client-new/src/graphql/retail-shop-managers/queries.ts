import { gql } from "@apollo/client";
import { User } from "../../../types/user";
import { inherits } from "util";

export interface RetailShopManagersData {
  retailShops: {
    items: {
      retailShopManager: User;
    }[];
  };
}
export const RETAIL_SHOP_MANAGERS = gql`
  query RetailShopManager {
    retailShops {
      items {
        retailShopManager {
          id
          firstName
          lastName
          phone
          userProfile {
            address {
              city
              street
              lat
              lng
            }
          }
        }
      }
    }
  }
`;
