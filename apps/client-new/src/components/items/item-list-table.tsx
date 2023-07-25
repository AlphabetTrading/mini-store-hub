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
import {
  WAREHOUSE_ITEMS,
  WarehouseItemsData,
  WarehouseStock,
} from "@/graphql/items/queries";

type Props = {
  warehouseItemsData: WarehouseItemsData;
};
// const DATA: WarehouseStock[] = [
//   {
//     product: {
//       id: "1",
//       name: "product1",
//       serialNumber: "123",
//       category: { name: "category1", id: "1" },
//       unit: "unit1",
//       activePrice: { purchasedPrice: 100, price: 200 ,createdAt: "2021-10-10"},
//     },
//     quantity: 10,
//   },
//   {
//     product: {
//       id: "2",
//       name: "product2",
//       serialNumber: "123",
//       category: { name: "category2", id: "2" },
//       unit: "unit2",
//       activePrice: { purchasedPrice: 100, price: 200 },
//     },
//     quantity: 10,
//   },
// ];

const ItemListTable = ({ warehouseItemsData }: Props) => {
  const { warehouseStockByWarehouseId: warehouseStocks } = warehouseItemsData;
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
