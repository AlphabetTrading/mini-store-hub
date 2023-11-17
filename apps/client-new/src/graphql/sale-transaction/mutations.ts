import { gql } from "@apollo/client";

export interface UpdateSaleTransactionVars {
  data: {
    retailShopId?: string;
    goods: {
      productId: string;
      quantity: number;
    }[];
  };
  updateSaleTransactionId: string;
}

export interface UpdateSaleTransactionData {
  id: string;
}

export const UPDATE_SALE_TRANSACTION = gql`
  mutation UpdateSaleTransaction(
    $data: UpdateSaleTransactionInput!
    $updateSaleTransactionId: String!
  ) {
    updateSaleTransaction(data: $data, id: $updateSaleTransactionId) {
      id
    }
  }
`;

export interface CreateSaleTransactionData {
  createSaleTransaction: {
    id: string;
  };
}

export interface CreateSaleTransactionVars {
  data: {
    retailShopId: string;
    goods: {
      quantity: number;
      productId: string;
    }[];
    createdAt?: string;
  };
}

export const CREATE_SALE_TRANSACTION = gql`
  mutation CreateSaleTransaction($data: CreateBulkSaleTransactionInput!) {
    createSaleTransaction(data: $data) {
      id
    }
  }
`;
