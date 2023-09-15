import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import { RetailShopManagerIcon } from "../icons/retail-shop-manager";
import { WarehouseDashboardIcon } from "../icons/warehouse_dashboard";

type Props = {
  valuation: number;
  totalProducts: number;
  totalUniqueProducts: number;
};

const WarehouseValuation = ({
  valuation,
  totalProducts,
  totalUniqueProducts,
}: Props) => {
  return (
    <Card sx={{ marginTop: 2 }}>
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
              <Typography variant="subtitle1">Total Inventory Value</Typography>
              <Typography variant="h2">{valuation}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                <RetailShopManagerIcon />
                <div style={{ flexDirection: "column" }}>
                  <Typography variant="subtitle1">
                    Total Number of Products
                  </Typography>
                  <Typography variant="h4">{totalProducts}</Typography>
                </div>
              </Stack>
              <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                <RetailShopManagerIcon />
                <div style={{ flexDirection: "column" }}>
                  <Typography variant="subtitle1">
                    Total Number of Unique Products
                  </Typography>
                  <Typography variant="h4">{totalUniqueProducts}</Typography>
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
  );
};

export default WarehouseValuation;
