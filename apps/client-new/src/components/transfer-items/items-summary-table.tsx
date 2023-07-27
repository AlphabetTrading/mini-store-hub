import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { WarehouseStock } from "../../../types/item";
import ItemsSummaryRow from "./items-summary-row";
import { SelectedWarehouseItem } from "@/app/(warehouse-manager)/transfer-items/page";

type Props = {
  handleRemoveItem: (id: string) => void;
  selectedItems: SelectedWarehouseItem[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<SelectedWarehouseItem[]>
  >;
};

const ItemsSummaryTable = ({
  handleRemoveItem,
  selectedItems,
  setSelectedItems,
}: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item Name</TableCell>
          <TableCell>Price Per Unit</TableCell>
          <TableCell>Quanity</TableCell>
          <TableCell>Selected Quanity</TableCell>
          <TableCell>Total Price</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedItems.map((item, idx) => (
          <ItemsSummaryRow
            selectedWarehouseItem={item}
            handleRemoveItem={handleRemoveItem}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ItemsSummaryTable;
