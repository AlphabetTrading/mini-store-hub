"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_INVENTORY_CONTENT_OF_WAREHOUSE,
  GET_LOW_STOCK_ITEMS_BY_WAREHOUSE,
  GET_STOCK_DISTRIBUTION,
  GET_TOTAL_VALUATION_OF_WAREHOUSE,
  GetInventoryContentData,
  GetInventoryContentVars,
  GetLowStockItemsByWarehouseData,
  GetLowStockItemsByWarehouseVars,
  GetStockDistributionData,
  GetStockDistributionVars,
  GetTotalWarehouseValuationData,
  GetTotalWarehouseValuationVars,
} from "@/graphql/warehouse-managers/queries";
import StateHandler from "@/components/state-handler";
import InventoryContent from "@/components/warehouse-manager-dashboard/inventory-content";
import WarehouseValuation from "@/components/warehouse-manager-dashboard/warehouse-valuation";
import { StockDistribution } from "@/components/warehouse-manager-dashboard/stock-distribution-chart";
import LowStockItemsTable from "@/components/warehouse-manager-dashboard/low-stock-items-table";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();
  const warehouseId = (sessionData?.user as any).warehouseId || "";
  console.log(sessionData)

  const { data, error, loading } = useQuery<
    GetTotalWarehouseValuationData,
    GetTotalWarehouseValuationVars
  >(GET_TOTAL_VALUATION_OF_WAREHOUSE, {
    variables: {
      warehouseId: warehouseId,
    },
  });

  const {
    data: inventoryContentData,
    error: inventoryContentError,
    loading: inventoryContentLoading,
  } = useQuery<GetInventoryContentData, GetInventoryContentVars>(
    GET_INVENTORY_CONTENT_OF_WAREHOUSE,
    {
      variables: {
        filterWarehouseStockInput: {
          warehouse: {
            id: warehouseId,
          },
        },
      },
    }
  );

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

  const pageLoading =
    stockDistributionLoading ||
    inventoryContentLoading ||
    lowStockLoading ||
    loading;
  const pageError =
    stockDistributionError || inventoryContentError || lowStockError || error;

  var totalQuantity = 0;
  var remainingQuantity = 0;
  inventoryContentData?.warehouseStocks.items.forEach((item) => {
    totalQuantity += item.maxQuantity;
    remainingQuantity += item.quantity;
  });

  return (
    <Box component="main" sx={{ height: "100%" }}>
      <StateHandler loading={pageLoading} error={pageError} empty={false}>
        <Container maxWidth="xl" sx={{ paddingY: 2 }}>
          {/* <Typography variant="h5">Warehouse Statistics</Typography> */}
          <Grid container spacing={6}>
            <Grid item md={12} lg={7} xl={7}>
              <WarehouseValuation
                valuation={data?.totalValuationByWarehouseId.totalValuation!}
                totalProducts={data?.totalValuationByWarehouseId.totalQuantity!}
                totalUniqueProducts={data?.totalValuationByWarehouseId.count!}
              />
            </Grid>
            <Grid item md={12} lg={5} xl={5}>
              <InventoryContent
                content={Number(
                  ((remainingQuantity / totalQuantity) * 100).toFixed()
                )}
                valuation={Number(
                  data?.totalValuationByWarehouseId.totalValuation
                )}
              />
            </Grid>
          </Grid>
          {/* <Grid container spacing={10} marginY={0}>
            <Grid item md={12} xl={12}>
              <TopSellingProducts />
            </Grid>
          </Grid> */}
          <Grid container marginY={1} spacing={6}>
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
