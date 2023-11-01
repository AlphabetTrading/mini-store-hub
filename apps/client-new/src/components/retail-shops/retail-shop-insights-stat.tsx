import {
  useGetAdminDashboardInsightsStatQuery,
  useGetAdminDashboardStatQuery,
} from "@/hooks/useGetAdminDashboardStatQuery";
import { Stack, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import StatCard from "../admin-dashboard/stat-card";
import StatMenu from "../admin-dashboard/stat-menu";

type Props = {
  retailShopId: string;
};
const options = ["Today's", "This week's", "This month's", "All time"];

const RetailShopInsightsStats = ({ retailShopId }: Props) => {
  const [timeFrame, setTimeFrame] = useState(options[0]);
  const { data, loading, error, refetch } =
    useGetAdminDashboardInsightsStatQuery(timeFrame, retailShopId);

  return (
    <Stack>
      <StatMenu
        options={options}
        setTimeFrame={setTimeFrame}
        timeFrame={timeFrame}
      />
      {loading ? (
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        data && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} xl={3}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/sold.svg"
                stat="sale"
                value={data.totalSalesByDateAndRetailShop}
                pastValue={data.totalPrevSalesByDateAndRetailShop}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/profit.svg"
                stat="profit"
                value={data.totalProfitByDateAndRetailShop}
                pastValue={data.totalPrevProfitByDateAndRetailShop}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/transaction.svg"
                stat="transaction"
                value={data.totalSoldProductsByRetailShopAndDate}
                pastValue={data.totalPrevSoldProductsByRetailShopAndDate}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/transaction.svg"
                stat="gross profit"
                value={
                  data.totalSalesByDateAndRetailShop !== 0
                    ? (data.totalProfitByDateAndRetailShop /
                        data.totalSalesByDateAndRetailShop) *
                      100
                    : 0
                }
                pastValue={
                  data.totalPrevSalesByDateAndRetailShop !== 0
                    ? (data.totalPrevProfitByDateAndRetailShop /
                        data.totalPrevSalesByDateAndRetailShop) *
                      100
                    : 0
                }
              />
            </Grid>
          </Grid>
        )
      )}
    </Stack>
  );
};

export default RetailShopInsightsStats;
