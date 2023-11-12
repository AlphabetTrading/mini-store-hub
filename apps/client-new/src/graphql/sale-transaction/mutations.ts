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
