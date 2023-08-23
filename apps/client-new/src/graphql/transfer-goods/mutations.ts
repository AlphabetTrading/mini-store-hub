import { gql } from "@apollo/client";
import { TransferType } from "../../../types/transaction-history";

export interface TransferGoodsVars {
  data: {
    sourceWarehouseId?: string;
    retailShopId?: string;
    goods?: {
      productId: string;
      quantity: number;
      goodsTransferId?: string;
    }[];
    destinationWarehouseId?: string;
    transferType?: TransferType;
  };
}

export interface TransferGoodsData {
  id: string;
}

export const TRANSFER_GOODS = gql`
  mutation Mutation($data: CreateGoodsTransferInput!) {
    createGoodsTransfer(data: $data) {
      id
    }
  }
`;
