import { gql } from "@apollo/client";

export const GET_PRODUCT_DETAIL = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      id
      name
      description
      amharicName
      amharicDescription
      unit
      serialNumber
      images
      activePrice {
        id
        price
      }
      priceHistory {
        id
        price
        purchasedPrice
      }
    }
  }
`;
