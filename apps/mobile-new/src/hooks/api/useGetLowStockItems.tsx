import { useQuery } from "@apollo/client";
import { GET_LOW_STOCK_PRODUCTS } from "../../graphql/queries/statsQueries";

export const useGetLowStockItems = (retailShopId: string, option?: any) => {
  return useQuery(GET_LOW_STOCK_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      retailShopId,
      paginationInput: {
        skip: 0,
        take: 5,
      },
      percentage: 50,
    },
    ...option,
  });
};
