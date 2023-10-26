"use client";
import { useMutation, useQuery } from "@apollo/client";
import {
  useMediaQuery,
  Card,
  CardHeader,
  Divider,
  Typography,
  Button,
  CircularProgress,
  Stack,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import StateHandler from "../state-handler";
import {
  RETAIL_SHOP,
  RETAIL_SHOP_VALUATION,
  RetailShopData,
  RetailShopValuationData,
  RetailShopValuationVars,
  RetailShopVars,
} from "@/graphql/retail-shops/queries";
import dayjs from "dayjs";
import { RetailShop } from "../../../types/retail-shop";
import {
  DeactivateRetailShopData,
  DeactivateRetailShopVars,
  DEACTIVATE_RETAIL_SHOP,
  ActivateRetailShopData,
  ActivateRetailShopVars,
  ACTIVATE_RETAIL_SHOP,
} from "@/graphql/retail-shops/mutations";
import { showAlert } from "@/helpers/showAlert";
import NextLink from "next/link";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  retailShop: RetailShop;
};

const RetailShopBasicDetails = ({ retailShop }: Props) => {
  const {
    data: valuationData,
    error: valuationError,
    loading: valuationLoading,
  } = useQuery<RetailShopValuationData, RetailShopValuationVars>(
    RETAIL_SHOP_VALUATION,
    {
      variables: {
        retailShopId: retailShop.id,
      },
    }
  );
  const valuation =
    valuationData?.totalValuationByRetailShopId.totalValuation || 0;

  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";
  const [
    deactivateRetailShop,
    {
      error: deactivateError,
      loading: deactivateLoading,
      reset: deactivateReset,
    },
  ] = useMutation<DeactivateRetailShopData, DeactivateRetailShopVars>(
    DEACTIVATE_RETAIL_SHOP
  );
  const [
    activateRetailShop,
    { error: activateError, loading: activateLoading, reset: activateReset },
  ] = useMutation<ActivateRetailShopData, ActivateRetailShopVars>(
    ACTIVATE_RETAIL_SHOP
  );
  const handleDeactivateRetailShop = async () => {
    await deactivateRetailShop({
      variables: {
        deactivateRetailShopId: retailShop.id,
      },
      onCompleted(data, clientOptions) {
        showAlert("deactivated a", "retail shop");
      },
      update(cache, { data }) {
        const existingRetailShop: RetailShopData = cache.readQuery<
          RetailShopData,
          RetailShopVars
        >({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: retailShop.id,
          },
        }) as RetailShopData;

        const newRetailShop: RetailShopData = {
          ...existingRetailShop,
          retailShop: {
            ...existingRetailShop?.retailShop,
            status: data?.status,
          },
        };
        cache.writeQuery<RetailShopData>({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: retailShop.id,
          },
          data: {
            retailShop: newRetailShop.retailShop,
          },
        });
      },
      onError(error) {
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  const handleActivateRetailShop = async () => {
    await activateRetailShop({
      variables: {
        activateRetailShopId: retailShop.id,
      },
      onCompleted(data, clientOptions) {
        showAlert("activated a", "retail shop");
      },
      update(cache, { data }) {
        const existingRetailShop: RetailShopData = cache.readQuery<
          RetailShopData,
          RetailShopVars
        >({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: retailShop.id,
          },
        }) as RetailShopData;

        const newRetailShop: RetailShopData = {
          ...existingRetailShop,
          retailShop: {
            ...existingRetailShop?.retailShop,
            status: data?.status,
          },
        };
        cache.writeQuery<RetailShopData>({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: retailShop.id,
          },
          data: {
            retailShop: newRetailShop.retailShop,
          },
        });
      },
      onError(error) {
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  return (
    <StateHandler
      loading={valuationLoading}
      empty={false}
      //   error={error ? error : valuationError ? valuationError : null}
    >
      <Card>
        <CardHeader
          title="Basic info"
          action={
            <Button
              variant="contained"
              component={NextLink}
              endIcon={<SvgIcon>{<EditIcon />}</SvgIcon>}
              href={`/admin/retail-shops/$pawarehouse.id}/edit`}
            >
              Edit
            </Button>
          }
        />
        <Divider />
        <PropertyList>
          <PropertyListItem
            align={align}
            label="Name"
            value={retailShop?.name}
          />
          <Divider />

          <PropertyListItem
            align={align}
            label="ስም"
            value={retailShop?.amharicName ? retailShop?.amharicName : "-"}
          />
          <Divider />

          <PropertyListItem align={align} label="Address">
            <Typography variant="subtitle2">
              {retailShop?.address?.city}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {retailShop?.address?.street}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {retailShop?.address?.formattedAddress}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {retailShop?.address?.amharicFormattedAddress}
            </Typography>
          </PropertyListItem>
          <Divider />
          <PropertyListItem align={align} label="ID" value={retailShop?.id} />
          <Divider />
          <PropertyListItem
            align={align}
            label="Retail Shop Value"
            value={`ETB ${valuation.toLocaleString("en-US")}`}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Created At"
            value={dayjs(retailShop?.createdAt).format("MMMM DD, YYYY")}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Retail Shop Manager"
            value={`${retailShop?.retailShopManager?.firstName} ${retailShop?.retailShopManager?.lastName}`}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Coordinates"
            value={
              retailShop?.address?.lng &&
              retailShop?.address?.lat &&
              `${retailShop?.address?.lng} , ${retailShop?.address?.lat}`
            }
          />
          <Divider />
          <PropertyListItem align={align} label="Data management">
            <Button
              variant={"outlined"}
              color={retailShop.status ? "error" : "primary"}
              disabled={deactivateLoading || activateLoading}
              // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
              onClick={() =>
                retailShop.status
                  ? handleDeactivateRetailShop()
                  : handleActivateRetailShop()
              }
            >
              {(deactivateLoading || activateLoading) && (
                <CircularProgress
                  size={16}
                  sx={{ mr: 1, color: "neutral.500" }}
                />
              )}
              {retailShop.status ? "Deactivate" : "Activate"}
            </Button>
          </PropertyListItem>
        </PropertyList>
      </Card>
    </StateHandler>
  );
};

export default RetailShopBasicDetails;
