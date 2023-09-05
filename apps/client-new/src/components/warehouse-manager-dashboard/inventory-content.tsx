import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import SemiCircleGauge from "../warehouses/semi-circle-gauge";

type Props = {
  content: number;
  valuation: number;
};

const InventoryContent = ({ content, valuation }: Props) => {
  return (
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
          <Stack spacing={2} direction="row" sx={{ alignItems: "flex-start" }}>
            <Stack direction="column">
              <Typography variant="subtitle1">Inventory Content</Typography>
              <h1 style={{ fontSize: 80 }}>{content}%</h1>
            </Stack>
            <Stack
              direction="column"
              sx={{
                justifyContent: "flex-start",
              }}
            >
              <SemiCircleGauge value={content} />
            </Stack>
          </Stack>
          <Typography variant="subtitle2" sx={{ marginTop: 4 }}>
            <span style={{ fontWeight: "bold" }}>{content}%</span> of the
            initial inventory still remains in the warehouse. In valuation, it
            is worth{" "}
            <span style={{ fontWeight: "bold" }}>{valuation} Birr</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default InventoryContent;
