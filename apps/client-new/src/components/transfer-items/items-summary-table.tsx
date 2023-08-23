import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
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
    <TableContainer style={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Selling Price Per Unit</TableCell>
            <TableCell>Quanity</TableCell>
            <TableCell>Selected Quanity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedItems.map((item, idx) => (
            <ItemsSummaryRow
              key={idx}
              selectedWarehouseItem={item}
              handleRemoveItem={handleRemoveItem}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsSummaryTable;
