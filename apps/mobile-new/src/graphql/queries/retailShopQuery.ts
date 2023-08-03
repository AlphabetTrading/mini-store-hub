import { gql } from "@apollo/client";

export const GET_RETAIL_SHOP_PRODUCTS_SIMPLE = gql`
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
          amharicName
          activePrice {
            price
          }
        }
      }
    }
  }
`;

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
  query RetailShopStockByProductIdAndByRetailShopId(
    $productId: String!
    $retailShopId: String!
  ) {
    retailShopStockByProductIdAndByRetailShopId(
      productId: $productId
      retailShopId: $retailShopId
    ) {
      quantity
      product {
        id
        name
        description
        amharicName
        amharicDescription
        serialNumber
        images
        activePrice {
          price
        }
        priceHistory {
          price
          createdAt
        }
      }
    }
  }
`;
