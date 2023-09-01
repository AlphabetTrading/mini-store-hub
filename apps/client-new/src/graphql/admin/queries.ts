import { gql } from "@apollo/client";

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
  }
`;
