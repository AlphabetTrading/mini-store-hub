import { gql } from "@apollo/client";
import { Item, WarehouseStock } from "../../../types/item";

export interface WarehouseItemsData {
  warehouseStockByWarehouseId: WarehouseStock[];
}

export interface WarehouseItemsVars {
  warehouseId: string;
}

export const WAREHOUSE_ITEMS = gql`
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

export interface ItemsData {
  products: { items: Item[] };
}

export interface ItemsVars {
  filterProductInput: {
    id: string;
  };
}

export const ITEMS = gql`
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
        }
      }
    }
  }
`;
