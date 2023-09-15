"use client";
import DashboardStat from "@/components/admin-dashboard/dashboard-stat";
import { TopRetailShops } from "@/components/admin-dashboard/top-retail-shops-chart";
import TopSellingProducts from "@/components/admin-dashboard/top-selling-products-table";
import { Box, Container, Stack, Grid } from "@mui/material";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <Box component="main">
      <Container maxWidth="xl">
        <Stack sx={{ marginTop: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DashboardStat />
            </Grid>
            <Grid item xs={12} md={8}>
              <TopSellingProducts />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopRetailShops />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
