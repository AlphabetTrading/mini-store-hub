String GET_PRODUCT_DETAIL = r"""
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
""";
