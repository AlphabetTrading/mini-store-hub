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

export interface RetailShopData {
  retailShop: RetailShop;
}

export interface RetailShopVars {
  retailShopId: string;
}

export const RETAIL_SHOP = gql`
  query RetailShop($retailShopId: String!) {
    retailShop(id: $retailShopId) {
      id
      name
      createdAt
      address {
        id
        lat
        lng
        street
        formattedAddress
        city
      }
      retailShopManager {
        id
        createdAt
        firstName
        lastName
        phone
        username
      }
    }
  }
`;

export interface RetailShopValuationVars {
  retailShopId: string;
}
export interface RetailShopValuationData {
  totalValuationByRetailShopId: number;
}

export const RETAIL_SHOP_VALUATION = gql`
  query Query($retailShopId: String!) {
    totalValuationByRetailShopId(retailShopId: $retailShopId)
  }
`;
