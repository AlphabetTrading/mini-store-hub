import { gql } from "@apollo/client";
import { Meta } from "../../../types/common";
import { Product, Unit } from "../../../types/product";
import { Category } from "../../../types/categories";
import { LowStockItemsWarehouse } from "../../../types/warehouse";

export interface GetTotalWarehouseValuationData {
  totalValuationByWarehouseId: {
    count: number;
    totalQuantity: number;
    totalValuation: number;
  };
}

export interface GetTotalWarehouseValuationVars {
  warehouseId: string;
}

export const GET_TOTAL_VALUATION_OF_WAREHOUSE = gql`
  query TotalValuationByWarehouseId($warehouseId: String!) {
    totalValuationByWarehouseId(warehouseId: $warehouseId) {
      count
      totalQuantity
      totalValuation
    }
  }
`;

export interface GetInventoryContentData {
  warehouseStocks: {
    items: {
      maxQuantity: number;
      quantity: number;
    }[];
  };
}

export interface GetInventoryContentVars {
  filterWarehouseStockInput: {
    warehouse: {
      id: string;
    };
  };
}

export const GET_INVENTORY_CONTENT_OF_WAREHOUSE = gql`
  query WarehouseStock($filterWarehouseStockInput: FilterWarehouseStockInput) {
    warehouseStocks(filterWarehouseStockInput: $filterWarehouseStockInput) {
      items {
        maxQuantity
        quantity
      }
    }
  }
`;

export interface GetLowStockItemsByWarehouseData {
  findLowStockByWarehouseId: {
    items: LowStockItemsWarehouse[];
    meta: Meta;
  };
}

export interface GetLowStockItemsByWarehouseVars {
  warehouseId: string;
  percentage: number;
  paginationInput: {
    take: number;
    skip: number;
  };
}

export const GET_LOW_STOCK_ITEMS_BY_WAREHOUSE = gql`
  query FindLowStockByWarehouseId(
    $warehouseId: String!
    $percentage: Float
    $paginationInput: PaginationInput
  ) {
    findLowStockByWarehouseId(
      warehouseId: $warehouseId
      percentage: $percentage
      paginationInput: $paginationInput
    ) {
      items {
        product {
          id
          name
          amharicName
          description
          serialNumber
          unit
          category {
            name
            amharicName
          }
        }
        quantity
        maxQuantity
      }
      meta {
        count
        limit
      }
    }
  }
`;

export interface GetStockDistributionData {
  warehouseStockByWarehouseId: {
    quantity: number;
    product: Product;
  }[];
}

export interface GetStockDistributionVars {
  warehouseId: string;
}

export const GET_STOCK_DISTRIBUTION = gql`
  query WarehouseStockByWarehouseId($warehouseId: String!) {
    warehouseStockByWarehouseId(warehouseId: $warehouseId) {
      quantity
      product {
        id
        name
        amharicName
      }
    }
  }
`;
