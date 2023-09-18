import { gql } from "@apollo/client";
import { RetailShop } from "../../../types/retail-shop";
import { Meta } from "../../../types/common";

export interface RetailShopsVars {
  filterRetailShopInput?: {
    name?: {
      contains: string;
    };
  };
  orderBy?: {
    name?: string;
    updatedAt?: string;
  };
  paginationInput: {
    skip: number;
    take: number;
  };
}

export interface RetailShopsData {
  retailShops: { items: RetailShop[]; meta: Meta };
}

export const RETAIL_SHOPS = gql`
  query RetailShops(
    $filterRetailShopInput: FilterRetailShopInput
    $orderBy: OrderByRetailShopInput
    $paginationInput: PaginationInput
  ) {
    retailShops(
      filterRetailShopInput: $filterRetailShopInput
      orderBy: $orderBy
      paginationInput: $paginationInput
    ) {
      items {
        id
        name
        status
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
      meta {
        count
        limit
        page
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
      amharicName
      createdAt
      status
      address {
        id
        lat
        lng
        street
        formattedAddress
        amharicFormattedAddress
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
  totalValuationByRetailShopId: {
    count: number;
    totalQuantity: number;
    totalValuation: number;
  };
}

export const RETAIL_SHOP_VALUATION = gql`
  query TotalValuationByRetailShopId($retailShopId: String!) {
    totalValuationByRetailShopId(retailShopId: $retailShopId) {
      count
      totalQuantity
      totalValuation
    }
  }
`;
