import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import {
  WarehouseData,
  WarehouseVars,
  WAREHOUSE,
  WAREHOUSE_VALUATION,
  WarehouseValuationData,
  WarehouseValuationVars,
} from "@/graphql/warehouses/queries";
import { useQuery } from "@apollo/client";
import StateHandler from "../state-handler";
import {
  GET_STOCK_DISTRIBUTION,
  GET_TOTAL_VALUATION_OF_WAREHOUSE,
  GetStockDistributionData,
  GetStockDistributionVars,
  GetTotalWarehouseValuationData,
  GetTotalWarehouseValuationVars,
} from "@/graphql/warehouse-managers/queries";
import dayjs from "dayjs";
import { StockDistribution } from "../warehouse-manager-dashboard/stock-distribution-chart";
import { Warehouse } from "../../../types/warehouse";

type Props = {
  warehouse: Warehouse;
};
const targetDate = new Date();
let startDate = new Date(targetDate);
startDate.setHours(0, 0, 0, 0);
let endDate = new Date(targetDate);
endDate.setHours(23, 59, 59, 999);

const WarehouseBasicDetails = ({ warehouse }: Props) => {
  const {
    data: valuationData,
    error: valuationError,
    loading: valuationLoading,
  } = useQuery<GetTotalWarehouseValuationData, GetTotalWarehouseValuationVars>(
    GET_TOTAL_VALUATION_OF_WAREHOUSE,
    {
      variables: {
        warehouseId: warehouse.id,
      },
    }
  );
  const {
    data: stockDistributionData,
    error: stockDistributionError,
    loading: stockDistributionLoading,
  } = useQuery<GetStockDistributionData, GetStockDistributionVars>(
    GET_STOCK_DISTRIBUTION,
    {
      variables: {
        warehouseId: warehouse.id,
      },
    }
  );
  const valuation = valuationData?.totalValuationByWarehouseId.totalValuation;

  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title="Basic info" />
          <StateHandler
            loading={valuationLoading}
            empty={false}
            // error={error ? error : valuationError ? valuationError : null}
          >
            <Divider />
            <PropertyList>
              <PropertyListItem
                align={align}
                label="Name"
                value={warehouse?.name}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="ስም"
                value={warehouse?.amharicName}
              />
              <Divider />
              <PropertyListItem align={align} label="Address">
                <Typography variant="subtitle2">
                  {warehouse?.address?.city}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {warehouse?.address?.street}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {warehouse?.address?.formattedAddress}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {warehouse?.address?.amharicFormattedAddress}
                </Typography>
              </PropertyListItem>
              <Divider />
              <PropertyListItem
                align={align}
                label="ID"
                value={warehouse?.id}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Warehouse Value"
                value={`ETB ${
                  valuation ? valuation?.toLocaleString("en-US") : 0
                }`}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Created At"
                value={dayjs(warehouse?.createdAt).format("MMM DD, YYYY")}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Warehouse Manager"
                value={`${warehouse?.warehouseManager?.firstName} ${warehouse?.warehouseManager?.lastName}`}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="Coordinates"
                value={
                  warehouse?.address?.lng &&
                  warehouse?.address?.lat &&
                  `${warehouse?.address?.lng} , ${warehouse?.address?.lat}`
                }
              />
              <Divider />
            </PropertyList>
          </StateHandler>
        </Card>
      </Grid>
      {stockDistributionData && valuationData && (
        <Grid item xs={12} lg={6}>
          <StockDistribution
            total={valuationData?.totalValuationByWarehouseId.totalQuantity}
            stockItems={stockDistributionData?.warehouseStockByWarehouseId}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default WarehouseBasicDetails;
