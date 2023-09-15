"use client";
import { useQuery } from "@apollo/client";
import {
  useMediaQuery,
  Card,
  CardHeader,
  Divider,
  Typography,
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

  return (
    <StateHandler
      loading={valuationLoading}
      empty={false}
      //   error={error ? error : valuationError ? valuationError : null}
    >
      <Card>
        <CardHeader title="Basic info" />
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
        </PropertyList>
      </Card>
    </StateHandler>
  );
};

export default RetailShopBasicDetails;
