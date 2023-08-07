import { gql } from "@apollo/client";
import { Product, WarehouseStock } from "../../../types/product";

export interface WarehouseStockData {
  warehouseStockByWarehouseId: WarehouseStock[];
}

export interface WarehouseStockVars {
  warehouseId: string;
}

export const WAREHOUSE_STOCK = gql`
  query WarehouseStockByWarehouseId($warehouseId: String!) {
    warehouseStockByWarehouseId(warehouseId: $warehouseId) {
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
  }
`;

export interface ProductsData {
  products: { items: Product[] };
}

export interface ProductsVars {
  filterProductInput: {
    id: string;
  };
}

export const PRODUCTS = gql`
  query Product(
    $filterProductInput: FilterProductInput
    $paginationInput: PaginationInput
  ) {
    products(
      filterProductInput: $filterProductInput
      paginationInput: $paginationInput
    ) {
      items {
        name
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
