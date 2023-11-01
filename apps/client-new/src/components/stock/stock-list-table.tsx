import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { StockItem } from "../../../types/product";
import StockListRow from "./stock-list-row";

type Props = {
  warehouseStocks: StockItem[];
};

const StockListTable = ({ warehouseStocks }: Props) => {
  return (
    <div>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              <TableCell>Product Name</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Total Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseStocks.map((warehouseStock, idx) => (
              <StockListRow key={idx} warehouseStock={warehouseStock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockListTable;
