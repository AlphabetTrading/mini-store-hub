import { gql } from "@apollo/client";

export const GET_TOTAL_SALES_BY_DATE_AND_RETAIL_SHOP = gql`
  query Query($endDate: String!, $retailShopId: String!, $startDate: String!) {
    totalSoldProductsByRetailShopAndDate(
      endDate: $endDate
      retailShopId: $retailShopId
      startDate: $startDate
    )
    totalProfitByDateAndRetailShop(
      endDate: $endDate
      retailShopId: $retailShopId
      startDate: $startDate
    )

    totalSalesByDateAndRetailShop(
      endDate: $endDate
      retailShopId: $retailShopId
      startDate: $startDate
    )

    totalSoldQuantityByRetailShopAndByDate(
      endDate: $endDate
      retailShopId: $retailShopId
      startDate: $startDate
    )
  }
`;

export const GET_LOW_STOCK_PRODUCTS = gql`
  query findLowStockByRetailShopId(
    $retailShopId: String!
    $paginationInput: PaginationInput
    $percentage: Float
  ) {
    findLowStockByRetailShopId(
      retailShopId: $retailShopId
      paginationInput: $paginationInput
      percentage: $percentage
    ) {
      items {
        quantity
        product {
          id
          name
          createdAt
          amharicName
          amharicDescription
          images
          unit
          updatedAt
          serialNumber
        }
        createdAt
        id
        updatedAt
        maxQuantity
      }
    }
  }
`;
