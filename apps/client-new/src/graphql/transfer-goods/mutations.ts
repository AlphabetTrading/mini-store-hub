import { gql } from "@apollo/client";

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
    transferType?: string;
  };
}

export interface TransferGoodsData {
  id: string;
}

export const TRANSFER_GOODS = gql`
  mutation CreateGoodsTransfer($data: CreateGoodsTransferInput!) {
    createGoodsTransfer(data: $data) {
      id
    }
  }
`;
