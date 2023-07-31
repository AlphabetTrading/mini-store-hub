import { gql } from "@apollo/client";

export const GET_RETAIL_SHOP_PRODUCTS = gql`
  query RetailShopStockByRetailShopId(
    $filterRetailShopStockInput: FilterRetailShopStockInput
  ) {
    retailShopStockByRetailShopId(
      filterRetailShopStockInput: $filterRetailShopStockInput
    ) {
      items {
        id
        quantity
        product {
          id
          name
          serialNumber
          unit
          amharicName
          amharicDescription
          activePrice {
            price
          }
        }
      }
    }
  }
`;

export const GET_RETAIL_SHOP_PRODUCT_DETAIL = gql`
  query Product($retailShopStockByIdId: String!) {
    retailShopStockById(id: $retailShopStockByIdId) {
      id
      quantity
      product {
        name
        amharicName
        description
        amharicDescription
        unit
        serialNumber
        images
        activePrice {
          price
          purchasedPrice
        }
        priceHistory {
          id
          price
          purchasedPrice
          product_created_at
        }
      }
    }
  }
`;
