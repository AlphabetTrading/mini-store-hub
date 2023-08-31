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
        productId
        quantity
        product {
          id
          name
          amharicName
          serialNumber
          unit
          images
          category {
            name
          }
          activePrice {
            price
            purchasedPrice
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
          images
          category {
            name
          }
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
        category {
          id
          name
        }
        activePrice {
          id
          price
        }
        priceHistory {
          id
          price
          createdAt
        }
      }
    }
  }
`;
