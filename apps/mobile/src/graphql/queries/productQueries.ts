import { gql } from "@apollo/client";

export const GET_PRODUCT_DETAIL = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      amharicName
      amharicDescription
      description
      images
      name
      priceHistory {
        purchasedPrice
        price
      }
      serialNumber
      unit
    }
  }
`;
