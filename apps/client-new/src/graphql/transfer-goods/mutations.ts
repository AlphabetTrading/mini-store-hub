import { gql } from "@apollo/client";
import { TransferType } from "../../../types/goods-transfer";

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

export interface updateTransferGoodsVars {
  data: {
    goods: {
      productId: string;
      quantity: number;
    }[];
  };
  updateGoodsTransferId: string;
}

export interface updateTransferGoodsData {
  id: string;
}

export const UPDATE_TRANSFER_GOODS = gql`
  mutation UpdateGoodsTransfer(
    $data: UpdateGoodsTransferInput!
    $updateGoodsTransferId: String!
  ) {
    updateGoodsTransfer(data: $data, id: $updateGoodsTransferId) {
      id
    }
  }
`;
