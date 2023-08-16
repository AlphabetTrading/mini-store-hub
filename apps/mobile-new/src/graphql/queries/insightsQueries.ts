import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_TOP_SELL_AND_BY_RETAIL_SHOP = gql`
  query findProductsByTopSellAndByRetailShop(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    findProductsByTopSellAndByRetailShop(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        id
        name
        amharicName
        unit
        serialNumber
      }
      meta {
        count
        limit
        page
      }
    }
  }
`;

export const GET_PRODUCTS_BY_SOLD_QUANTITY_AND_BY_RETAIL_SHOP = gql`
  query findProductsBySoldQuantityAndRetailShop(
    $retailShopId: String!
    $paginationInput: PaginationInput
  ) {
    findProductsBySoldQuantityAndRetailShop(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
    ) {
      items {
        id
        name
        amharicName
        unit
        serialNumber
      }
      meta {
        count
        limit
        page
      }
    }
  }
`;
