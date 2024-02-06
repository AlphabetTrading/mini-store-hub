import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EmptyTable from "../empty-table";
import { SelectedStockItem } from "../../../types/stock-item";
import ItemsSummaryWRSRow from "./items-summary-w-rs-row";

type Props = {
  handleRemoveItem: (id: string) => void;
  selectedItems: SelectedStockItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedStockItem[]>>;
  filteredItems: SelectedStockItem[];
};

const ItemsSummaryWRS = ({
  handleRemoveItem,
  selectedItems,
  setSelectedItems,
  filteredItems,
}: Props) => {
  return (
    <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
      <Table stickyHeader sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Selling Price Per Unit</TableCell>
            <TableCell>Total Quantity</TableCell>
            <TableCell>Selected Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        {selectedItems.length === 0 ? (
          <EmptyTable colspan={6} />
        ) : (
          <TableBody>
            {filteredItems.map((item, idx) => (
              <ItemsSummaryWRSRow
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

export default ItemsSummaryWRS;
