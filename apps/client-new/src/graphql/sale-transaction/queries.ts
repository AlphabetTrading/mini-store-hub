import { gql } from "@apollo/client";
import { Meta } from "../../../types/common";
import { SaleTransaction } from "../../../types/sale-transaction";

export interface RetailShopSaleTransactionsVars {
  retailShopId: string;
  paginationInput?: {
    take?: number;
    skip?: number;
  };
}

export interface RetailShopSaleTransactionsData {
  saleTransactionsByRetailShop: {
    items: SaleTransaction[];
    meta: Meta;
  };
}

export const RETAIL_SHOP_SALE_TRANSACTIONS = gql`
  query SaleTransactionsByRetailShop(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    saleTransactionsByRetailShop(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        createdAt
        totalPrice
        saleTransactionItems {
          quantity
          id
          product {
            id
            name
            images
            serialNumber
            unit
            activePrice {
              price
            }
          }

          subTotal
        }
        id
      }
      meta {
        count
        limit
        page
      }
    }
  }
`;
