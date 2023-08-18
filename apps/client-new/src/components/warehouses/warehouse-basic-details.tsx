import {
  Card,
  CardHeader,
  Divider,
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
  GET_TOTAL_VALUATION_OF_WAREHOUSE,
  GetTotalWarehouseValuationData,
  GetTotalWarehouseValuationVars,
} from "@/graphql/warehouse-managers/queries";

type Props = {
  warehouseId: string;
};
const targetDate = new Date();
let startDate = new Date(targetDate);
startDate.setHours(0, 0, 0, 0);
let endDate = new Date(targetDate);
endDate.setHours(23, 59, 59, 999);

const WarehouseBasicDetails = ({ warehouseId }: Props) => {
  const { data, error, loading } = useQuery<WarehouseData, WarehouseVars>(
    WAREHOUSE,
    {
      variables: {
        warehouseId: warehouseId,
      },
    }
  );
  const {
    data: valuationData,
    error: valuationError,
    loading: valuationLoading,
  } = useQuery<GetTotalWarehouseValuationData, GetTotalWarehouseValuationVars>(
    GET_TOTAL_VALUATION_OF_WAREHOUSE,
    {
      variables: {
        warehouseId: warehouseId,
      },
    }
  );
  const valuation = valuationData?.totalValuationByWarehouseId.totalValuation;

  const warehouse = data?.warehouse;

  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <StateHandler
      loading={loading || valuationLoading}
      empty={false}
      error={error}
      // error={error ? error : valuationError ? valuationError : null}
    >
      <Card>
        <CardHeader title="Basic info" />
        <Divider />
        <PropertyList>
          <PropertyListItem
            align={align}
            label="Name"
            value={warehouse?.name}
          />
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
          <PropertyListItem align={align} label="ID" value={warehouse?.id} />
          <Divider />
          <PropertyListItem
            align={align}
            label="Warehouse Value"
            value={`ETB ${valuation ? valuation?.toLocaleString("en-US") : 0}`}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Created At"
            value={warehouse?.createdAt}
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
      </Card>
    </StateHandler>
  );
};

export default WarehouseBasicDetails;
