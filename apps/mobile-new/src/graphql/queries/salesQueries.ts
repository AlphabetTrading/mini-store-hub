import { gql } from "@apollo/client";

export const GET_INCOMING_TRANSACTIONS_BY_RETAIL_SHOP = gql`
  query findOutgoingGoodsTransferByWarehouseId(
    $filterGoodsTransferInput: FilterGoodsTransferInput
  ) {
    goodsTransfers(filterGoodsTransferInput: $filterGoodsTransferInput) {
      items {
        id
        goods {
          id
          quantity
        }
        sourceWarehouse {
          name
          amharicName
        }
        transferType
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP = gql`
  query saleTransaction(
    $retailShopId: String!
    $orderBy: OrderBySaleTransactionInput
  ) {
    saleTransactionsByRetailShop(
      retailShopId: $retailShopId
      orderBy: $orderBy
    ) {
      items {
        id
        totalPrice
        createdAt
        saleTransactionItems {
          id
        }
      }
    }
  }
`;

export const GET_SINGLE_SALES_TRANSACTION_BY_RETAIL_SHOP = gql`
  query SaleTransaction($saleTransactionId: String!) {
    saleTransaction(id: $saleTransactionId) {
      id
      totalPrice
      createdAt
      saleTransactionItems {
        id
        quantity
        subTotal
        product {
          id
          name
          description
          amharicName
          amharicDescription
          serialNumber
        }
      }
    }
  }
`;

export const GET_INCOMING_TRANSACTIONS_BY_RETAIL_SHOP_AND_DATE = gql`
  query GoodsTransfer($goodsTransferId: String!) {
    goodsTransfer(id: $goodsTransferId) {
      id
      sourceWarehouse {
        id
        name
        amharicName
      }
      goods {
        id
        quantity
        product {
          id
          name
          amharicName
          description
          amharicDescription
          activePrice {
            id
            price
            purchasedPrice
          }
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
