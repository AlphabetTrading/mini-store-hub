import { gql } from "@apollo/client";
import { Meta } from "../../../types/common";
import { RetailShopSaleTransaction } from "../../../types/retail-shop-transaction-item";

export interface RetailShopSaleTransactionsVars {
  retailShopId: string;
  paginationInput?: {
    take?: number;
    skip?: number;
  };
}

export interface RetailShopSaleTransactionsData {
  retailShopTransactionsByRetailShop: {
    items: RetailShopSaleTransaction[];
    meta: Meta;
  };
}

export const RETAIL_SHOP_SALE_TRANSACTIONS = gql`
  query RetailShopTransactionsByRetailShop(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    retailShopTransactionsByRetailShop(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        id
        createdAt
        total
        retailShopTransactionItems {
          id
          createdAt
          subTotal
          quantity
          retailShopStock {
            product {
              id
              name
              images
              serialNumber
              unit
            }
            priceHistory {
              id
              price
              purchasedPrice
            }
            activePrice {
              id
              price
              purchasedPrice
            }
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

// export const RETAIL_SHOP_SALE_TRANSACTIONS = gql`
//   query SaleTransactionsByRetailShop(
//     $retailShopId: String!
//     $paginationInput: PaginationInput
//   ) {
//     saleTransactionsByRetailShop(
//       retailShopId: $retailShopId
//       paginationInput: $paginationInput
//     ) {
//       items {
//         createdAt
//         totalPrice
//         saleTransactionItems {
//           quantity
//           id
//           product {
//             id
//             name
//             images
//             serialNumber
//             unit
//             activePrice {
//               price
//             }
//           }

//           subTotal
//         }
//         id
//       }
//       meta {
//         count
//         limit
//         page
//       }
//     }
//   }
// `;
