import { gql } from "@apollo/client";
import { Product, StockItem } from "../../../types/product";
import { Meta } from "../../../types/common";

export interface WarehouseStockVars {
  filterWarehouseStockInput: {
    warehouse: {
      id: string;
    };
    product?: {
      name: {
        contains: string;
      };
      serialNumber: {
        contains: string;
      };
    };
  };
  paginationInput?: {
    take: number;
    skip: number;
  };
  orderBy?: {
    product?: {
      name?: string;
      createdAt?: string;
      category?: {
        createdAt?: string;
        name?: string;
        updatedAt?: string;
      };
      serialNumber?: string;
      unit?: string;
      updatedAt?: string;
    };
    createdAt?: string;
    quantity?: string;
    updatedAt?: string;
    warehouse?: {
      createdAt: string;
      name: string;
      updatedAt: string;
    };
  };
}

export interface WarehouseStockData {
  warehouseStocks: {
    items: StockItem[];
    meta: Meta;
  };
}

export const WAREHOUSE_STOCK = gql`
  query WarehouseStocks(
    $paginationInput: PaginationInput
    $filterWarehouseStockInput: FilterWarehouseStockInput
    $orderBy: OrderByWarehouseStockInput
  ) {
    warehouseStocks(
      paginationInput: $paginationInput
      filterWarehouseStockInput: $filterWarehouseStockInput
      orderBy: $orderBy
    ) {
      items {
        product {
          priceHistory {
            id
            price
            purchasedPrice
            createdAt
          }
          category {
            id
            name
          }
          id
          name
          activePrice {
            price
            purchasedPrice
          }
          serialNumber
          unit
        }
        quantity
      }
      meta {
        count
        page
      }
    }
  }
`;

export interface ProductsData {
  products: {
    items: Product[];
    meta: Meta;
  };
}

export interface ProductsVars {
  filterProductInput?: {
    name?: {
      contains: string;
    };
    serialNumber?: {
      contains: string;
    };
  };
  paginationInput?: {
    take?: number;
    skip?: number;
  };
  orderBy?: {
    name?: string;
    createdAt?: string;
    category?: {
      createdAt?: string;
      name?: string;
      updatedAt?: string;
    };
    serialNumber?: string;
    unit?: string;
    updatedAt?: string;
  };
}

export const PRODUCTS = gql`
  query Products(
    $paginationInput: PaginationInput
    $filterProductInput: FilterProductInput
    $orderBy: OrderByProductInput
  ) {
    products(
      paginationInput: $paginationInput
      filterProductInput: $filterProductInput
      orderBy: $orderBy
    ) {
      items {
        name
        amharicName
        id
        priceHistory {
          createdAt
          id
          price
          purchasedPrice
          createdAt
        }
        serialNumber
        unit
        description
        amharicDescription
        category {
          id
          name
        }
        activePrice {
          price
          purchasedPrice
          id
        }
      }
      meta {
        count
      }
    }
  }
`;

export interface ProductData {
  product: Product;
}

export interface ProductVars {
  productId: string;
}

export const PRODUCT = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      id
      name
      serialNumber
      unit
      description
      activePrice {
        id
        price
        purchasedPrice
      }
      priceHistory {
        id
        price
        purchasedPrice
        createdAt
      }
      category {
        id
        name
      }
    }
  }
`;
