import { gql } from "@apollo/client";

export interface WarehouseItemsData {
  warehouseStockByWarehouseId: WarehouseStock[];
}

export interface WarehouseItemsVars {
  warehouseId:string;
}

export interface WarehouseStock {
  quantity: number;
  product: Item;
}

interface Item {
  id: string;
  serialNumber: string;
  unit: string;
  name: string;
  category: { id: string; name: string };
  activePrice: { id: string; purchasedPrice: number; price: number };
  priceHisotry: {
    id: string;
    purchasedPrice: number;
    price: number;
    createdAt: Date;
  }[];
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
