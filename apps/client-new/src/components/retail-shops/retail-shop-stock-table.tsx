import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { StockItem } from "../../../types/stock-item";
import RetailShopStockItem from "./retail-shop-stock-item";

type Props = {
  warehouseStocks: RetailShopStockItem[];
};

const RetailShopStockTable = ({ warehouseStocks }: Props) => {
  const [selectedStockItem, setSelectedStockItem] = useState<string|null>(null);
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseStocks.map((warehouseStock, idx) => (
              <RetailShopStockItem key={idx} retailShopStock={warehouseStock} selectedStockItem={selectedStockItem} setSelectedStockItem={setSelectedStockItem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RetailShopStockTable;
