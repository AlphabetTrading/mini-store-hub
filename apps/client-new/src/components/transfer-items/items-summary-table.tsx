import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ItemsSummaryRow from "./items-summary-row";
import { SelectedWarehouseItem } from "@/app/(warehouse-manager)/transfer-items/page";
import EmptyTable from "../empty-table";

type Props = {
  handleRemoveItem: (id: string) => void;
  selectedItems: SelectedWarehouseItem[];
  setSelectedItems: React.Dispatch<
    React.SetStateAction<SelectedWarehouseItem[]>
  >;
  filteredItems: SelectedWarehouseItem[];
};

const ItemsSummaryTable = ({
  handleRemoveItem,
  selectedItems,
  setSelectedItems,
  filteredItems,
}: Props) => {
  return (
    <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
      <Table stickyHeader sx={{ minWidth: 900}}>
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

        {selectedItems.length === 0 ? (
          <EmptyTable colspan={6} />
        ) : (
          <TableBody>
            {filteredItems.map((item, idx) => (
              <ItemsSummaryRow
                key={idx}
                selectedWarehouseItem={item}
                handleRemoveItem={handleRemoveItem}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ItemsSummaryTable;
