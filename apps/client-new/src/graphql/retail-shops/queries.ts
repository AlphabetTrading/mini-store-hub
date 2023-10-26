import { gql } from "@apollo/client";
import { RetailShop } from "../../../types/retail-shop";
import { Meta } from "../../../types/common";
import { StockItem, Product } from "../../../types/product";
import { SaleTransaction } from "../../../types/sale-transaction";

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

export interface RetailShopStockVars {
  filterRetailShopStockInput: {
    retailShopId: string;
  };
  paginationInput?: {
    skip?: number;
    take?: number;
  };
}

export interface RetailShopStockData {
  retailShopStockByRetailShopId: {
    items: StockItem[];
    meta: Meta;
  };
}

export const RETAIL_SHOP_STOCK = gql`
  query RetailShopStockByRetailShopId(
    $filterRetailShopStockInput: FilterRetailShopStockInput
    $paginationInput: PaginationInput
  ) {
    retailShopStockByRetailShopId(
      filterRetailShopStockInput: $filterRetailShopStockInput
      paginationInput: $paginationInput
    ) {
      items {
        id
        quantity
        product {
          id
          images
          name
          category {
            id
            name
          }
          activePrice {
            id
            price
            purchasedPrice
          }
          serialNumber
          unit
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


export interface RSTopSellingProductsData {
  findProductsBySoldQuantityAndRetailShop: {
    items: Product[];
  };
}

export interface RSTopSellingProductsVars {
  retailShopId: string;
  paginationInput?: {
    skip?: number;
    take?: number;
  };
}

export const RETAIL_SHOP_TOP_SELLING_PRODUCTS = gql`
  query FindProductsBySoldQuantityAndRetailShop(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    findProductsBySoldQuantityAndRetailShop(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        id
        name
        serialNumber
        category {
          id
          name
        }
      }
    }
  }
`;

export interface RSTopRevenueProductsData {
  findProductsByTopSellAndByRetailShop: {
    items: Product[];
  };
}

export interface RSTopRevenueProductsVars {
  retailShopId: string;
  paginationInput?: {
    skip?: number;
    take?: number;
  };
}

export const RETAIL_SHOP_TOP_REVENUE_PRODUCTS = gql`
  query FindProductsByTopSellAndByRetailShop(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    findProductsByTopSellAndByRetailShop(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        id
        name
        serialNumber
        category {
          id
          name
        }
      }
    }
  }
`;

export interface RSLowStockProductsVars {
  retailShopId: string;
  paginationInput?: {
    skip?: number;
    take?: number;
  };
}
export interface RSLowStockProductsData {
  findLowStockByRetailShopId: {
    items: StockItem[];
  };
}

export const RETAIL_SHOP_LOW_STOCK_PRODUCTS = gql`
  query FindLowStockByRetailShopId(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    findLowStockByRetailShopId(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        id
        quantity
        product {
          id
          name
          category {
            id
            name
          }
        }
      }
    }
  }
`;
