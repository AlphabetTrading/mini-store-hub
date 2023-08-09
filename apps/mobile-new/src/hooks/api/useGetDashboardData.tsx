import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_TOTAL_SALES_BY_DATE_AND_RETAIL_SHOP } from "../../graphql/queries/statsQueries";

export const useGetSalesData = (
  retailShopId: string,
  selectedFilter: string
) => {
  const targetDate = new Date();
  let startDate = new Date(targetDate);
  startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  let endDate = new Date(targetDate);
  endDate.setHours(23, 59, 59, 999); // Set time to the end of the day

  if (selectedFilter === "daily") {
    startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
  } else if (selectedFilter === "weekly") {
    // get weekly sales, startDate is 7 days ago, and endDate is today

    startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
  } else if (selectedFilter === "monthly") {
    // get monthly sales, startDate is 30 days ago, and endDate is today
    startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
  } else {
    // get yearly sales, startDate is 365 days ago, and endDate is today

    startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 365);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
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
