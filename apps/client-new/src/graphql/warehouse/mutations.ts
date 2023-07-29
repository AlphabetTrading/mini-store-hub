import { gql } from "@apollo/client";

export interface RegisterIncomingStockVars {
  data: {
    goods: [
      {
        productId: string;
        quantity: number;
      }
    ];
    warehouseId: string;
  };
}

export interface RegisterIncomingStockData {
  id: string;
}

export const REGISTER_INCOMING_STOCK = gql`
  mutation CreateBulkWarehouseStock($data: CreateBulkWarehouseStockInput!) {
    createBulkWarehouseStock(data: $data) {
      id
    }
  }
`;
