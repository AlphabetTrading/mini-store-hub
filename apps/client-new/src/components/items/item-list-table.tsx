import React, { useState } from "react";
import { Scrollbar } from "../scrollbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ItemListRow from "./item-list-row";
import { WarehouseStockData } from "@/graphql/products/queries";


type Props = {
  warehouseStockData: WarehouseStockData;
};

const ItemListTable = ({ warehouseStockData }: Props) => {
  const { warehouseStockByWarehouseId: warehouseStocks } = warehouseStockData;
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleItemToggle = (id: string) => {
    setSelectedItem((prev) => {
      if (prev === id) {
        return null;
      }
      return id;
    });
  };

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Product Name</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Selling Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseStocks.map((warehouseStock, idx) => (
              <ItemListRow
                key={idx}
                warehouseStock={warehouseStock}
                handleItemToggle={handleItemToggle}
                selected={warehouseStock.product.id === selectedItem}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

export default ItemListTable;
