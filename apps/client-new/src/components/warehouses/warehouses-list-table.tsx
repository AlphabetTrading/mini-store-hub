import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { Warehouse } from "../../../types/warehouse";
import WarehousesListRow from "./warehouses-list-row";

type Props = {
  warehouses: Warehouse[];
};

const WarehousesListTable = ({ warehouses }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Manager</TableCell>
          <TableCell>Location Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {warehouses.map((warehouse) => (
          <WarehousesListRow key={warehouse.id} warehouse={warehouse} />
        ))}
      </TableBody>
    </Table>
  );
};

export default WarehousesListTable;
