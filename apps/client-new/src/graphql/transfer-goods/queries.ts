import { gql } from "@apollo/client";
import { TransactionHistory } from "../../../types/transaction-history";
import { Meta } from "../../../types/common";

export interface WarehouseTransactionHistoryData {
  findGoodsTransferByWarehouseId: { items: TransactionHistory[]; meta: Meta };
}

export interface WarehouseTransactionHistoryVars {
  warehouseId: string;
  paginationInput?: {
    take?: number;
    skip?: number;
  };
  orderBy?: {
    createdAt?: string;
  };
}

export const WAREHOUSE_TRANSACTION_HISTORY = gql`
  query FindGoodsTransferByWarehouseId(
    $warehouseId: String!
    $paginationInput: PaginationInput
    $orderBy: OrderByGoodsTransferInput
  ) {
    findGoodsTransferByWarehouseId(
      warehouseId: $warehouseId
      paginationInput: $paginationInput
      orderBy: $orderBy
    ) {
      items {
        transferType
        id
        createdAt
        retailShop {
          id
          name
        }
        goods {
          id
          quantity
          product {
            name
            id
            images
            activePrice {
              price
            }
            category {
              id
              name
            }
            unit
          }
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
