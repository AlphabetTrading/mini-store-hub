import { gql } from "@apollo/client";
import { RetailShop } from "../../../types/retail-shop";

export interface RetailShopsData {
  retailShops: { items: RetailShop[] };
}

export const RETAIL_SHOPS = gql`
  query RetailShops {
    retailShops {
      items {
        id
        name
        retailShopManager {
          firstName
          lastName
          id
        }
        address {
          city
          street
          lat
          lng
        }
      }
    }
  }
`;
