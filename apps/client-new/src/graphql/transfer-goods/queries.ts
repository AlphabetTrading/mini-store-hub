import { gql } from "@apollo/client";
import { TransactionHistory } from "../../../types/transaction-history";

export interface WarehouseTransactionHistoryData {
  findGoodsTransferByWarehouseId: { items: TransactionHistory[] };
}

export interface WarehouseTransactionHistoryVars {
  warehouseId: string;
}

export const WAREHOUSE_TRANSACTION_HISTORY = gql`
  query FindGoodsTransferByWarehouseId($warehouseId: String!) {
    findGoodsTransferByWarehouseId(warehouseId: $warehouseId) {
      items {
        transferType
        id
        createdAt
        retailShop {
          id
          name
        }
        
      }
    }
  }
`;
