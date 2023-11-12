String GET_RETAILSHOP_PRODUCTS = r"""
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
""";


String GET_RETAIL_SHOP_PRODUCTS = r"""
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
""";


String GET_RETAIL_SHOP_PRODUCT_DETAIL = r"""
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
        unit
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
""";
