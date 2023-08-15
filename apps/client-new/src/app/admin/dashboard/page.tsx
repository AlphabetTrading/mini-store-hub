"use client";
import StatCard from "@/components/admin-dashboard/stat-card";
import { TopRetailShops } from "@/components/admin-dashboard/top-retail-shops-chart";
import TopSellingProducts from "@/components/admin-dashboard/top-selling-products-table";
import { Box, Card, Container, Grid, Stack } from "@mui/material";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <Box component="main">
      <Container>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard imgSrc="/assets/icons/revenue.svg" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard imgSrc="/assets/icons/sold.svg" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard imgSrc="/assets/icons/profit.svg" />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StatCard imgSrc="/assets/icons/transaction.svg" />
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
      </Container>
    </Box>
  );
};

export default page;
