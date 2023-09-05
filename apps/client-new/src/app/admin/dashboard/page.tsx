"use client";
import DashboardStat from "@/components/admin-dashboard/dashboard-stat";
import StatCard from "@/components/admin-dashboard/stat-card";
import StatMenu from "@/components/admin-dashboard/stat-menu";
import { TopRetailShops } from "@/components/admin-dashboard/top-retail-shops-chart";
import TopSellingProducts from "@/components/admin-dashboard/top-selling-products-table";
import {
  GET_ADMIN_DASHBOARD_RETAIL_SHOPS_BY_TOTAL_SALES,
  GET_ADMIN_DASHBOARD_TOP_SELLING_PRODUCTS,
  TopSellingProductsData,
  TopSellingProductsVars,
} from "@/graphql/admin/queries";
import { useGetAdminDashboardStatQuery } from "@/hooks/useGetAdminDashboardStatQuery";
import { useQuery } from "@apollo/client";
import { Box, Container, Stack, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";

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
