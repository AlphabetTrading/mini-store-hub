import { useGetAdminDashboardStatQuery } from "@/hooks/useGetAdminDashboardStatQuery";
import { Stack, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import StatCard from "./stat-card";
import StatMenu from "./stat-menu";

type Props = {};
const options = ["Today's", "This week's", "This month's", "All time"];

const DashboardStat = (props: Props) => {
  const [timeFrame, setTimeFrame] = useState(options[0]);
  const { data, loading, error, refetch } =
    useGetAdminDashboardStatQuery(timeFrame);
    console.log(data)
    console.log(error)

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
            <Grid item xs={12} md={6} lg={4}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/sold.svg"
                stat="sale"
                value={data.totalSalesByDate}
                pastValue={data.totalPrevSalesByDate}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/profit.svg"
                stat="profit"
                value={data.totalProfitByDate}
                pastValue={data.totalPrevProfitByDate}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <StatCard
                timeFrame={timeFrame}
                imgSrc="/assets/icons/transaction.svg"
                stat="transaction"
                value={data.totalTransactionsByDate}
                pastValue={data.totalPrevTransactionsByDate}
              />
            </Grid>
          </Grid>
        )
      )}
    </Stack>
  );
};

export default DashboardStat;
