import { gql } from "@apollo/client";

export const GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP = gql`
  query saleTransaction(
    $retailShopId: String!
    $orderBy: OrderBySaleTransactionInput
  ) {
    saleTransactionsByRetailShop(
      retailShopId: $retailShopId
      orderBy: $orderBy
    ) {
      items {
        id
        totalPrice
        createdAt
        saleTransactionItems {
          id
        }
      }
    }
  }
`;

export const GET_SINGLE_SALES_TRANSACTION_BY_RETAIL_SHOP = gql`
  query SaleTransaction($saleTransactionId: String!) {
    saleTransaction(id: $saleTransactionId) {
      id
      totalPrice
      createdAt
      saleTransactionItems {
        id
        quantity
        subTotal
        product {
          id
          name
          description
          amharicName
          amharicDescription
          serialNumber
        }
      }
    }
  }
`;
