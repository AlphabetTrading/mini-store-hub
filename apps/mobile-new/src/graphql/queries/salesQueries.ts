import { gql } from "@apollo/client";

export const GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP = gql`
  query SaleTransactionsByRetailShop(
    $retailShopId: String!
    $orderBy: SaleTransactionOrder
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
        price
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
