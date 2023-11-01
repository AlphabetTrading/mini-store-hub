import { gql } from "@apollo/client";
import { GoodsTransfer } from "../../../types/goods-transfer";
import { Meta } from "../../../types/common";

export interface WarehouseTransactionHistoryData {
  findGoodsTransferByWarehouseId: { items: GoodsTransfer[]; meta: Meta };
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
        destinationWarehouse {
          id
        }
        sourceWarehouse {
          id
        }

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
            serialNumber
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
