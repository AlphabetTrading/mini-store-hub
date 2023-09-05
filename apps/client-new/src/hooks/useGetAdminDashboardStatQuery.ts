import { GET_ADMIN_DASHBOARD_STAT_BY_DATE } from "@/graphql/admin/queries";
import { useQuery } from "@apollo/client";

export const useGetAdminDashboardStatQuery = (selectedFilter: any) => {
  const targetDate = new Date();
  let startDate = new Date(targetDate);
  let prevStartDate = new Date(targetDate);
  startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  prevStartDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  let endDate = new Date(targetDate);
  endDate.setHours(23, 59, 59, 999); // Set time to the end of the day

  if (selectedFilter === "Today's") {
    startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    prevStartDate.setDate(targetDate.getDate() - 1);
    prevStartDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
  } else if (selectedFilter === "This week's") {
    // get weekly sales, startDate is 7 days ago, and endDate is today
    startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    prevStartDate.setDate(targetDate.getDate() - 7);
    prevStartDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
  } else if (selectedFilter === "This month's") {
    // get monthly sales, startDate is 30 days ago, and endDate is today
    startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    prevStartDate.setDate(targetDate.getDate() - 30);
    prevStartDate.setHours(0, 0, 0, 0);
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
  } else {
    startDate = new Date("2023-01-01");
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    prevStartDate = new Date("2023-01-01");
    prevStartDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);
  }

  return useQuery(GET_ADMIN_DASHBOARD_STAT_BY_DATE, {
    variables: {
      salesEndDate: endDate,
      salesStartDate: startDate,
      prevSalesEndDate: startDate,
      prevSalesStartDate: prevStartDate,
      profitEndDate: endDate,
      profitStartDate: startDate,
      prevProfitEndDate: startDate,
      prevProfitStartDate: prevStartDate,
      transactionsEndDate: endDate,
      transactionsStartDate: startDate,
      prevTransactionsEndDate: startDate,
      prevTransactionsStartDate: prevStartDate,
    },
    notifyOnNetworkStatusChange: true,
  });
};
