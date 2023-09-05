import { TableRow, TableCell, Stack, Typography } from "@mui/material";
import React from "react";
import { LowStockItemsWarehouse } from "../../../types/warehouse";

type Props = {
  lowStockItem: LowStockItemsWarehouse;
};

const LowStockItemsRow = ({ lowStockItem }: Props) => {
  return (
    <TableRow>
      <TableCell width="55%">
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <div
            style={{ height: 30, width: 30, backgroundColor: "#F0F0F0" }}
          ></div>
          <Stack>
            <Typography variant="subtitle2" color="text.primary">
              {lowStockItem.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Serial Number: #{lowStockItem.product.serialNumber}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width="10%">
        {(lowStockItem.quantity / lowStockItem.maxQuantity) * 100}
      </TableCell>
      <TableCell width="35%">{lowStockItem.quantity}</TableCell>
    </TableRow>
  );
};

export default LowStockItemsRow;
