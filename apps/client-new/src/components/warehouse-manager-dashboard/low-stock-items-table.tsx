import {
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { LowStockItemsWarehouse } from "../../../types/warehouse";
import LowStockItemsRow from "./low-stock-items-row";

type Props = {
  lowStockItems?: LowStockItemsWarehouse[];
};

const LowStockItemsTable = ({ lowStockItems }: Props) => {
  return (
    <Card>
      <CardHeader title="Low Stock Items" />{" "}
      <Table sx={{ minWidth: 800, overflow: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell width="55%">Product</TableCell>
            <TableCell width="10%">%</TableCell>
            <TableCell width="35%">Items Left</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lowStockItems?.map((lowStockItem, idx) => (
            <LowStockItemsRow key={idx} lowStockItem={lowStockItem} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LowStockItemsTable;
