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
