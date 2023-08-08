import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_TOTAL_SALES_BY_DATE_AND_RETAIL_SHOP } from "../../graphql/queries/statsQueries";

export const useGetSalesData = (
  retailShopId: string,
  selectedFilter: string
) => {
  let startDate = "";
  let endDate = "";

  if (selectedFilter === "daily") {
    // get daily sales, startDate is last date, and endDate is today
    startDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    endDate = new Date(Date.now()).toISOString().split("T")[0];
  } else if (selectedFilter === "weekly") {
    // get weekly sales, startDate is 7 days ago, and endDate is today
    startDate = new Date(Date.now() - 604800000).toISOString().split("T")[0];
    endDate = new Date(Date.now()).toISOString().split("T")[0];
  } else if (selectedFilter === "monthly") {
    // get monthly sales, startDate is 30 days ago, and endDate is today
    startDate = new Date(Date.now() - 2592000000).toISOString().split("T")[0];
    endDate = new Date(Date.now()).toISOString().split("T")[0];
  } else {
    // get yearly sales, startDate is 365 days ago, and endDate is today
    startDate = new Date(Date.now() - 31536000000).toISOString().split("T")[0];
    endDate = new Date(Date.now()).toISOString().split("T")[0];
  }

  return useQuery(GET_TOTAL_SALES_BY_DATE_AND_RETAIL_SHOP, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      retailShopId,
      startDate,
      endDate,
    },
  });
};
