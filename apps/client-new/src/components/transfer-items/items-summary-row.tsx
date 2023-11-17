import React from "react";
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { SelectedStockItem } from "../../../types/stock-item";

type Props = {
  selectedWarehouseItem: SelectedStockItem;
  handleRemoveItem(id: string): void;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<SelectedStockItem[]>
  >;
  selectedItems: SelectedStockItem[];
};

const ItemsSummaryRow = ({
  selectedWarehouseItem,
  handleRemoveItem,
  setSelectedItems,
  selectedItems,
}: Props) => {
  const handleItemQuantityChange = (
    selectedItem: SelectedStockItem,
    val: number
  ) => {
    if (selectedItem.selectedQuantity + val <= 0) {
      setSelectedItems(
        selectedItems.filter(
          (item) =>
            item.stockItem.product.id !==
            selectedItem.stockItem.product.id
        )
      );
    } else if (
      selectedItem.selectedQuantity + val >
      selectedItem.stockItem.quantity
    ) {
      return;
    } else {
      selectedItem.selectedQuantity += val;
      setSelectedItems((prev) =>
        prev.map((item) => {
          if (
            item.stockItem.product.id ===
            selectedItem.stockItem.product.id
          ) {
            return selectedItem;
          } else {
            return item;
          }
        })
      );
    }
  };
  const { stockItem, selectedQuantity } = selectedWarehouseItem;

  return (
    <TableRow>
      <TableCell>
        <Stack>
          <Typography variant="body2">{stockItem.product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            SN-{stockItem.product.serialNumber}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>{stockItem.product.activePrice?.price}</TableCell>
      <TableCell>{stockItem.quantity}</TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Stack>
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleItemQuantityChange(selectedWarehouseItem, 1)}
            >
              <ArrowDropUp />
            </IconButton>
            <IconButton
              sx={{ p: 0 }}
              onClick={() =>
                handleItemQuantityChange(selectedWarehouseItem, -1)
              }
            >
              <ArrowDropDown />
            </IconButton>
          </Stack> */}
          <Typography>{selectedQuantity}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        {(
          stockItem.product.activePrice?.price * selectedQuantity
        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleRemoveItem(stockItem.product.id)}>
          <DeleteOutline color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ItemsSummaryRow;
