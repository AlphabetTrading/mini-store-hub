import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import CustomChip from "../custom-chip";
import { StockItem } from "../../../types/stock-item";

type Props = {
  warehouseStock: StockItem;
};

const StockListRow = ({ warehouseStock }: Props) => {
  const { product, quantity } = warehouseStock;
  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Stack>
            <Typography variant="body2">{product.name}</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >{`SN #${product.serialNumber}`}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <CustomChip label={product.category.name} />
        </TableCell>
        <TableCell align="left">
          <CustomChip label={product.unit} status="neutral" />
        </TableCell>
        <TableCell align="left">{quantity}</TableCell>

        <TableCell align="left">
          {(product.activePrice?.purchasedPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </TableCell>
        <TableCell align="left">
          {(product.activePrice?.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </TableCell>
        <TableCell align="left">
          {(product.activePrice?.price * quantity).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </TableCell>
      </TableRow>
    </>
  );
};

export default StockListRow;
