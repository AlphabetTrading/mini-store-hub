"use client";
import StatCard from "@/components/admin-dashboard/stat-card";
import StatMenu from "@/components/admin-dashboard/stat-menu";
import { TopRetailShops } from "@/components/admin-dashboard/top-retail-shops-chart";
import TopSellingProducts from "@/components/admin-dashboard/top-selling-products-table";
import { Box, Card, Container, Grid, Stack } from "@mui/material";
import React, { useState } from "react";

type Props = {};
const options = ["Today's", "This week's", "This month's", "All time"];

const page = (props: Props) => {
  const [timeFrame, setTimeFrame] = useState(options[0]);
  return (
    <Box component="main">
      <Container>
        <Stack spacing={2}>
          <StatMenu
            options={options}
            setTimeFrame={setTimeFrame}
            timeFrame={timeFrame}
          />
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <StatCard
                  timeFrame={timeFrame}
                  stat="revenue"
                  imgSrc="/assets/icons/revenue.svg"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StatCard
                  timeFrame={timeFrame}
                  imgSrc="/assets/icons/sold.svg"
                  stat="sale"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StatCard
                  timeFrame={timeFrame}
                  imgSrc="/assets/icons/profit.svg"
                  stat="profit"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StatCard
                  timeFrame={timeFrame}
                  imgSrc="/assets/icons/transaction.svg"
                  stat="transaction"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TopSellingProducts />
              </Grid>
              <Grid item xs={12} md={4}>
                <TopRetailShops />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default page;
