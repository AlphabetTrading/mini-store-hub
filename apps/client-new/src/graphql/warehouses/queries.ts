import { gql } from "@apollo/client";
import { Warehouse } from "../../../types/warehouse";

export interface WarehousesData {
  warehouses: {
    items: Warehouse[];
  };
}

export const WAREHOUSES = gql`
  query Warehouses {
    warehouses {
      items {
        id
        name
        address {
          city
          formattedAddress
          lat
          lng
          street
        }
        warehouseManager {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export interface WarehouseData {
  warehouse: Warehouse;
}

export interface WarehouseVars {
  warehouseId: string;
}

export const WAREHOUSE = gql`
  query Warehouse($warehouseId: String!) {
    warehouse(id: $warehouseId) {
      id
      name
      amharicName
      createdAt
      address {
        lat
        lng
        street
        city
        formattedAddress
        amharicFormattedAddress
      }
      warehouseManager {
        id
        firstName
        lastName
      }
    }
  }
`;

export interface WarehouseValuationData {
  totalValuationByWarehouseId: number;
}
export interface WarehouseValuationVars {
  endDate: string;
  startDate: string;
  warehouseId: string;
}
export const WAREHOUSE_VALUATION = gql`
  query Query($endDate: String!, $startDate: String!, $warehouseId: String!) {
    totalValuationByWarehouseId(
      endDate: $endDate
      startDate: $startDate
      warehouseId: $warehouseId
    )
  }
`;
