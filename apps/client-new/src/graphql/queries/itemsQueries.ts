import { gql } from "@apollo/client";

export const SINGLE_WAREHOUSE_ITEMS = gql`
  query WarehouseStock($filterWarehouseStockInput: FilterWarehouseStockInput) {
    warehouseStocks(filterWarehouseStockInput: $filterWarehouseStockInput) {
      quantity
      product {
        id
        serialNumber
        unit
        category {
          name
          id
        }
        activePrice {
          purchasedPrice
          price
        }
      }
    }
  }
`;
