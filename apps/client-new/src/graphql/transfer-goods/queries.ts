import { gql } from "@apollo/client";
import { TransactionHistory } from "../../../types/transaction-history";

export interface TransactionHistoryData{
    goodsTransferByWarehouseId: TransactionHistory[];
}

export interface TransactionHistoryVars{
    warehouseId: string;
}


export const TRANSACTION_HISTORY = gql`
  query GoodsTransferByWarehouseId($warehouseId: String!) {
    goodsTransferByWarehouseId(warehouseId: $warehouseId) {
      retailShop {
        name
        id
      }
      transferType
      createdAt
    }
  }
`;
