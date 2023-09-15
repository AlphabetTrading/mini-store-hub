import { gql } from "@apollo/client";
import { Product } from "../../../types/product";
import { User } from "../../../types/user";

export const GET_ADMIN_DASHBOARD_STAT_BY_DATE = gql`
  query Query(
    $salesEndDate: String!
    $salesStartDate: String!
    $prevSalesEndDate: String!
    $prevSalesStartDate: String!
    $profitEndDate: String!
    $profitStartDate: String!
    $prevProfitEndDate: String!
    $prevProfitStartDate: String!
    $transactionsEndDate: String!
    $transactionsStartDate: String!
    $prevTransactionsEndDate: String!
    $prevTransactionsStartDate: String!
  ) {
    totalProfitByDate: totalProfitByDate(
      endDate: $profitEndDate
      startDate: $profitStartDate
    )
    totalPrevProfitByDate: totalProfitByDate(
      endDate: $prevProfitEndDate
      startDate: $prevProfitStartDate
    )
    totalSalesByDate: totalSalesByDate(
      endDate: $salesEndDate
      startDate: $salesStartDate
    )
    totalPrevSalesByDate: totalSalesByDate(
      endDate: $prevSalesEndDate
      startDate: $prevSalesStartDate
    )
    totalTransactionsByDate: totalTransactionsByDate(
      endDate: $transactionsEndDate
      startDate: $transactionsStartDate
    )
    totalPrevTransactionsByDate: totalTransactionsByDate(
      endDate: $prevTransactionsEndDate
      startDate: $prevTransactionsStartDate
    )
  }
`;

export interface TopSellingProductsVars {
  paginationInput: {
    skip: number;
    take: number;
  };
}
export interface TopSellingProductsData {
  findProductsByTopSell: {
    items: Product[];
  };
}

export const GET_ADMIN_DASHBOARD_TOP_SELLING_PRODUCTS = gql`
  query FindProductsByTopSell($paginationInput: PaginationInput) {
    findProductsByTopSell(paginationInput: $paginationInput) {
      items {
        name
        amharicName
        id
        serialNumber
        unit
        description
        amharicDescription
        category {
          id
          name
        }
        saleTransactionItem {
          id
          subTotal
          quantity
        }
      }
    }
  }
`;

export interface TopSellingRetailShopVars {
  endDate: string;
  startDate: string;
  paginationInput?: {
    skip: number;
    take: number;
  };
}
export interface TopSellingRetailShopBySalesData {
  retailShopSortByTotalSales: {
    items: {
      name: string;
      retailShopManager: User;
      totalSales: number;
    }[];
  };
  totalSalesByDate: number;
}

export const GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_SALES = gql`
  query RetailShopSortByTotalSales(
    $endDate: String!
    $startDate: String!
    $paginationInput: PaginationInput
  ) {
    retailShopSortByTotalSales(
      endDate: $endDate
      startDate: $startDate
      paginationInput: $paginationInput
    ) {
      items {
        name
        retailShopManager {
          firstName
          lastName
          amharicFirstName
          amharicLastName
        }
        totalSales
      }
    }
    totalSalesByDate(endDate: $endDate, startDate: $startDate)
  }
`;

export interface TopSellingRetailShopByProfitData {
  retailShopSortByTotalProfit: {
    items: {
      name: string;
      retailShopManager: User;
      totalProfit: number;
    }[];
  };
  totalProfitByDate: number;
}

export const GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_PROFIT = gql`
  query RetailShopSortByTotalSales(
    $endDate: String!
    $startDate: String!
    $paginationInput: PaginationInput
  ) {
    retailShopSortByTotalSales(
      endDate: $endDate
      startDate: $startDate
      paginationInput: $paginationInput
    ) {
      items {
        name
        retailShopManager {
          firstName
          lastName
          amharicFirstName
          amharicLastName
        }
        totalProfit
      }
    }
    totalProfitByDate(endDate: $endDate, startDate: $startDate)
  }
`;

export interface TopSellingRetailShopByTransactionsData {
  retailShopSortByTotalTransactions: {
    items: {
      name: string;
      retailShopManager: User;
      totalTransactions: number;
    }[];
  };
}

export const GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_TRANSACTIONS = gql`
  query RetailShopSortByTotalSales(
    $endDate: String!
    $startDate: String!
    $paginationInput: PaginationInput
  ) {
    retailShopSortByTotalSales(
      endDate: $endDate
      startDate: $startDate
      paginationInput: $paginationInput
    ) {
      items {
        name
        retailShopManager {
          firstName
          lastName
          amharicFirstName
          amharicLastName
        }
        totalTransactions
      }
    }
  }
`;
