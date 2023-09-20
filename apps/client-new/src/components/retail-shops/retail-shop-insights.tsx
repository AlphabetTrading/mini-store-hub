import React from "react";
import RetailShopTopSellingProducts from "./retail-shop-top-selling-products";
import { Grid } from "@mui/material";
import RetailShopTopRevenueProducts from "./retail-shop-top-revenue-products";

type Props = {
  retailShopId: string;
};

const RetailShopInsights = ({ retailShopId }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <RetailShopTopSellingProducts retailShopId={retailShopId} />
      </Grid>
      <Grid item xs={12} md={6}>
        <RetailShopTopRevenueProducts retailShopId={retailShopId} />
      </Grid>
    </Grid>
  );
};

export default RetailShopInsights;
