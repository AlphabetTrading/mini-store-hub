import { gql } from "@apollo/client";

export const CREATE_SALES_TRANSACTION_MUTATION = gql`
  mutation CreateSaleTransaction($data: CreateBulkSaleTransactionInput!) {
    createSaleTransaction(data: $data) {
      id
      totalPrice
      createdAt
      saleTransactionItems {
        id
      }
    }
  }
`;
