import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  SvgIcon,
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
} from "@/graphql/warehouses/queries";
import { useMutation, useQuery } from "@apollo/client";
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
import {
  DeactivateWarehouseData,
  DeactivateWarehouseVars,
  DEACTIVATE_WAREHOUSE,
  ActivateWarehouseData,
  ActivateWarehouseVars,
  ACTIVATE_WAREHOUSE,
} from "@/graphql/warehouses/mutations";
import { showAlert } from "@/helpers/showAlert";
import NextLink from "next/link";
import EditIcon from "@mui/icons-material/Edit";

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
  const [
    deactivateWarehouse,
    {
      error: deactivateError,
      loading: deactivateLoading,
      reset: deactivateReset,
    },
  ] = useMutation<DeactivateWarehouseData, DeactivateWarehouseVars>(
    DEACTIVATE_WAREHOUSE
  );
  const [
    activateWarehouse,
    { error: activateError, loading: activateLoading, reset: activateReset },
  ] = useMutation<ActivateWarehouseData, ActivateWarehouseVars>(
    ACTIVATE_WAREHOUSE
  );
  const handleDeactivate = async () => {
    await deactivateWarehouse({
      variables: {
        deactivateWarehouseId: warehouse.id,
      },
      update(cache, { data }) {
        const existingWarehouse: WarehouseData = cache.readQuery<
          WarehouseData,
          WarehouseVars
        >({
          query: WAREHOUSE,
          variables: {
            warehouseId: warehouse.id,
          },
        }) as WarehouseData;

        const newWarehouse: WarehouseData = {
          ...existingWarehouse,
          warehouse: {
            ...existingWarehouse?.warehouse,
            status: data?.deactivateWarehouse.status,
          },
        };
        cache.writeQuery<WarehouseData>({
          query: WAREHOUSE,
          variables: {
            retailShopId: warehouse.id,
          },
          data: {
            warehouse: newWarehouse.warehouse,
          },
        });
      },
      onCompleted(data, clientOptions) {
        showAlert("deactivated a", "warehouse");
      },
      onError(error) {
        console.log(error);
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  const handleActivate = async () => {
    await activateWarehouse({
      variables: {
        activateWarehouseId: warehouse.id,
      },
      update(cache, { data }) {
        const existingWarehouse: WarehouseData = cache.readQuery<
          WarehouseData,
          WarehouseVars
        >({
          query: WAREHOUSE,
          variables: {
            warehouseId: warehouse.id,
          },
        }) as WarehouseData;

        const newWarehouse: WarehouseData = {
          ...existingWarehouse,
          warehouse: {
            ...existingWarehouse?.warehouse,
            status: data?.activateWarehouse.status,
          },
        };
        cache.writeQuery<WarehouseData>({
          query: WAREHOUSE,
          variables: {
            retailShopId: warehouse.id,
          },
          data: {
            warehouse: newWarehouse.warehouse,
          },
        });
      },
      onCompleted(data, clientOptions) {
        showAlert("activated a", "warehouse");
      },
      onError(error) {
        console.log(error);
        setTimeout(() => {
          activateReset();
        }, 3000);
      },
    });
  };

  const valuation = valuationData?.totalValuationByWarehouseId.totalValuation;

  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Grid container>
      <Grid item xs={12} lg={6} sx={{ paddingRight: 4 }}>
        <Card>
          <CardHeader
            title="Basic info"
            action={
              <IconButton aria-label="settings">
                <Button
                  variant="contained"
                  component={NextLink}
                  endIcon={<SvgIcon>{<EditIcon />}</SvgIcon>}
                  href={`/admin/warehouses/${warehouse.id}/edit`}
                >
                  Edit
                </Button>
              </IconButton>
            }
          />

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
                value={warehouse?.name ? warehouse?.name : "-"}
              />
              <Divider />
              <PropertyListItem
                align={align}
                label="ስም"
                value={warehouse?.amharicName ? warehouse?.amharicName : "-"}
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
                value={
                  warehouse?.warehouseManager
                    ? `${warehouse?.warehouseManager?.firstName} ${warehouse?.warehouseManager?.lastName}`
                    : "-"
                }
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
              <PropertyListItem align={align} label="Data Management">
                <Button
                  variant="outlined"
                  color={warehouse.status ? "error" : "primary"}
                  disabled={deactivateLoading || activateLoading}
                  // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
                  onClick={() =>
                    warehouse.status ? handleDeactivate() : handleActivate()
                  }
                >
                  {(deactivateLoading || activateLoading) && (
                    <CircularProgress
                      size={16}
                      sx={{ mr: 1, color: "neutral.500" }}
                    />
                  )}
                  {warehouse.status ? "Deactivate" : "Activate"}
                </Button>
              </PropertyListItem>
            </PropertyList>
            {/* <Container maxWidth="xl"> */}
            {(activateError || deactivateError) && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {activateError?.message || deactivateError?.message}
              </Alert>
            )}
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
