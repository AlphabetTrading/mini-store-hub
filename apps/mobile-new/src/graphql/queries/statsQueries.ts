import { gql } from "@apollo/client";

export const GET_TOTAL_SALES_BY_DATE_AND_RETAIL_SHOP = gql`
    query GetTotalSalesByDateAndRetailShop($endDate: String!, $retailShopId: String!, , $startDate: String!) {
        query Query($endDate: String!, $retailShopId: String!, $startDate: String!) {
  totalSalesByDateAndRetailShop(endDate: $endDate, retailShopId: $retailShopId, startDate: $startDate)
}
  `;

export const GET_TOTAL_SALES_BY_DATE_AND_RETAIL_SHOP_AND_PRODUCT = gql`
    query GetTotalSalesByDateAndRetailShopAndProduct($endDate: String!, $productId: String!, $retailShopId: String!, $startDate: String!) {
        query Query($endDate: String!, $productId: String!, $retailShopId: String!, $startDate: String!) {
    totalSalesByDateAndRetailShopAndProduct(endDate: $endDate, productId: $productId, retailShopId: $retailShopId, startDate: $startDate)
    }
    `;
