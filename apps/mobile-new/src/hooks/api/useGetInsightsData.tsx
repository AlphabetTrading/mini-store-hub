import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_PRODUCTS_BY_SOLD_QUANTITY_AND_BY_RETAIL_SHOP,
  GET_PRODUCTS_BY_TOP_SELL_AND_BY_RETAIL_SHOP,
} from "../../graphql/queries/insightsQueries";
import { INSIGHTS_TYPE } from "../../types/types";

export const useGetInsightsData = (
  retailShopId: string,
  insightsType: INSIGHTS_TYPE
) => {
  let query = GET_PRODUCTS_BY_TOP_SELL_AND_BY_RETAIL_SHOP;

  if (insightsType === INSIGHTS_TYPE.MOST_REVENUE_BY_ITEM) {
    query = GET_PRODUCTS_BY_TOP_SELL_AND_BY_RETAIL_SHOP;
  } else if (insightsType === INSIGHTS_TYPE.MOST_SOLD_ITEMS) {
    query = GET_PRODUCTS_BY_SOLD_QUANTITY_AND_BY_RETAIL_SHOP;
  }

  return useQuery(query, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      retailShopId,
      paginationInput: {
        skip: 0,
        take: 5,
      },
    },
  });
};

export const useGetInsightsDataDetail = (
  retailShopId: string,
  insightsType: INSIGHTS_TYPE
) => {
  let query = GET_PRODUCTS_BY_TOP_SELL_AND_BY_RETAIL_SHOP;

  if (insightsType === INSIGHTS_TYPE.MOST_REVENUE_BY_ITEM) {
    query = GET_PRODUCTS_BY_TOP_SELL_AND_BY_RETAIL_SHOP;
  } else if (insightsType === INSIGHTS_TYPE.MOST_SOLD_ITEMS) {
    query = GET_PRODUCTS_BY_SOLD_QUANTITY_AND_BY_RETAIL_SHOP;
  }

  return useQuery(query, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: {
      retailShopId,
    },
  });
};
