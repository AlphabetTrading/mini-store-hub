import { TableRow, TableCell } from "@mui/material";
import React from "react";
import { Warehouse } from "../../../types/warehouse";
import NextLink from "next/link";

type Props = {
  warehouse: Warehouse;
};

const WarehousesListRow = ({ warehouse }: Props) => {
  return (
    <TableRow
      component={NextLink}
      href={`/admin/warehouses/${warehouse.id}`}
      hover
      sx={{ textDecoration: "none" }}
    >
      <TableCell>{warehouse?.name}</TableCell>
      <TableCell>
        {warehouse?.warehouseManager
          ? `${warehouse?.warehouseManager?.firstName} ${warehouse?.warehouseManager?.lastName}`
          : "-"}
      </TableCell>
      <TableCell>{warehouse?.address?.formattedAddress}</TableCell>
    </TableRow>
  );
};

export default WarehousesListRow;
