"use client";
import { RetailShopManagerIcon } from "@/components/icons/retail-shop-manager";
import { RetailShopsIcon } from "@/components/icons/retail-shops";
import { WarehouseDashboardIcon } from "@/components/icons/warehouse_dashboard";
import SemiCircleGauge from "@/components/warehouses/semi-circle-gauge";
import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
// import ProfileSvg from "../../../../public/assets/images/Group 6.png";
import Image from "next/image";
import TopSellingProducts from "@/components/warehouse-manager-dashboard/top-selling-products-table";
import LowStockItemsTable from "@/components/warehouse-manager-dashboard/low-stock-items-table";
import { StockDistribution } from "@/components/warehouse-manager-dashboard/stock-distribution-chart";
import { useQuery } from "@apollo/client";
import {
  GET_LOW_STOCK_ITEMS_BY_WAREHOUSE,
  GET_STOCK_DISTRIBUTION,
  GET_TOTAL_VALUATION_OF_WAREHOUSE,
  GetLowStockItemsByWarehouseData,
  GetLowStockItemsByWarehouseVars,
  GetStockDistributionData,
  GetStockDistributionVars,
  GetTotalWarehouseValuationData,
  GetTotalWarehouseValuationVars,
} from "@/graphql/warehouse-managers/queries";
import StateHandler from "@/components/state-handler";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();
  const warehouseId = (sessionData?.user as any).warehouseId || "";
  const { data, error, loading } = useQuery<
    GetTotalWarehouseValuationData,
    GetTotalWarehouseValuationVars
  >(GET_TOTAL_VALUATION_OF_WAREHOUSE, {
    variables: {
      warehouseId: warehouseId,
    },
  });

  const {
    data: lowStockData,
    error: lowStockError,
    loading: lowStockLoading,
  } = useQuery<
    GetLowStockItemsByWarehouseData,
    GetLowStockItemsByWarehouseVars
  >(GET_LOW_STOCK_ITEMS_BY_WAREHOUSE, {
    variables: {
      warehouseId: warehouseId,
      percentage: 20,
      paginationInput: {
        take: 6,
        skip: 0,
      },
    },
  });

  const {
    data: stockDistributionData,
    error: stockDistributionError,
    loading: stockDistributionLoading,
  } = useQuery<GetStockDistributionData, GetStockDistributionVars>(
    GET_STOCK_DISTRIBUTION,
    {
      variables: {
        warehouseId: warehouseId,
      },
    }
  );

  const pageLoading = stockDistributionLoading || lowStockLoading || loading;
  const pageError = stockDistributionError || lowStockError || error;

  return (
    <Box component="main" sx={{ height: "100%" }}>
      <StateHandler loading={pageLoading} error={pageError} empty={false}>
        <Container maxWidth="xl" sx={{ paddingY: 2 }}>
          <Typography variant="h5">Warehouse Statistics</Typography>
          <Grid container spacing={10}>
            <Grid item md={12} lg={7} xl={7}>
              <Card sx={{ flexDirection: "row", marginTop: 2 }}>
                <Stack
                  direction="column"
                  sx={{
                    height: 375,
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      height: "90%",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        height: "75%",
                        marginX: 4,
                        // backgroundColor: "green",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack direction="column">
                        <Typography variant="subtitle1">
                          Total Inventory Value
                        </Typography>
                        <Typography variant="h2">
                          {data?.totalValuationByWarehouseId.totalValuation}
                        </Typography>
                      </Stack>
                      <Stack direction="column" spacing={1}>
                        <Stack
                          spacing={2}
                          direction="row"
                          sx={{ alignItems: "center" }}
                        >
                          <RetailShopManagerIcon />
                          <div style={{ flexDirection: "column" }}>
                            <Typography variant="subtitle1">
                              Total Number of Products
                            </Typography>
                            <Typography variant="h4">
                              {data?.totalValuationByWarehouseId.totalQuantity}
                            </Typography>
                          </div>
                        </Stack>
                        <Stack
                          spacing={2}
                          direction="row"
                          sx={{ alignItems: "center" }}
                        >
                          <RetailShopManagerIcon />
                          <div style={{ flexDirection: "column" }}>
                            <Typography variant="subtitle1">
                              Total Number of Unique Products
                            </Typography>
                            <Typography variant="h4">
                              {data?.totalValuationByWarehouseId.count}
                            </Typography>
                          </div>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="column"
                      sx={{
                        position: "relative",
                        width: 0.5,
                        height: 0.9,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <WarehouseDashboardIcon
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    </Stack>

                    {/* <WarehouseDashboardIcon sx={{ width: "100%" }} /> */}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
            <Grid item md={12} lg={5} xl={5}>
              <Card sx={{ marginTop: 2 }}>
                <Stack
                  direction="column"
                  sx={{
                    height: 375,
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  <Stack direction="column" sx={{ height: "70%", marginX: 5 }}>
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ alignItems: "flex-start" }}
                    >
                      <Stack direction="column">
                        <Typography variant="subtitle1">
                          Inventory Content
                        </Typography>
                        <h1 style={{ fontSize: 80 }}>78%</h1>
                      </Stack>
                      <Stack
                        direction="column"
                        sx={{
                          justifyContent: "flex-start",
                        }}
                      >
                        <SemiCircleGauge value={78} />
                      </Stack>
                    </Stack>
                    <Typography variant="subtitle2" sx={{ marginTop: 4 }}>
                      78% of the initial inventory still remains in the
                      warehouse. 112,067 worth of stock still remains in the
                      stock
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          {/* <Grid container spacing={10} marginY={0}>
            <Grid item md={12} xl={12}>
              <TopSellingProducts />
            </Grid>
          </Grid> */}
          <Grid container marginY={2} spacing={10}>
            <Grid item xs={12} lg={6}>
              <StockDistribution
                total={data?.totalValuationByWarehouseId.totalQuantity}
                stockItems={stockDistributionData?.warehouseStockByWarehouseId}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LowStockItemsTable
                lowStockItems={lowStockData?.findLowStockByWarehouseId.items}
              />
            </Grid>
          </Grid>
          {/* <Grid container spacing={10} marginY={2}>
            <Grid item md={12} xl={6}>
              <LowStockItemsTable />
            </Grid>
            <Grid item md={12} xl={6}>
              <LowStockItemsTable />
            </Grid>
          </Grid> */}
          {/* <Typography variant="h6">Warehouse Statistics</Typography> */}
        </Container>
      </StateHandler>
    </Box>
  );
};

export default Page;
