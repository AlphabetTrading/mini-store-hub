import React from "react";
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { SelectedWarehouseItem } from "@/app/(warehouse-manager)/transfer-items/page";
import { ArrowDropUp, ArrowDropDown, DeleteOutline } from "@mui/icons-material";

type Props = {
  selectedWarehouseItem: SelectedWarehouseItem;
  handleRemoveItem(id: string): void;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<SelectedWarehouseItem[]>
  >;
  selectedItems: SelectedWarehouseItem[];
};

const ItemsSummaryRow = ({
  selectedWarehouseItem,
  handleRemoveItem,
  setSelectedItems,
  selectedItems,
}: Props) => {
  const handleItemQuantityChange = (
    selectedItem: SelectedWarehouseItem,
    val: number
  ) => {
    if (selectedItem.selectedQuantity + val <= 0) {
      setSelectedItems(
        selectedItems.filter(
          (item) =>
            item.warehouseStock.product.id !==
            selectedItem.warehouseStock.product.id
        )
      );
    } else if (
      selectedItem.selectedQuantity + val >
      selectedItem.warehouseStock.quantity
    ) {
      return;
    } else {
      selectedItem.selectedQuantity += val;
      setSelectedItems((prev) =>
        prev.map((item) => {
          if (
            item.warehouseStock.product.id ===
            selectedItem.warehouseStock.product.id
          ) {
            return selectedItem;
          } else {
            return item;
          }
        })
      );
    }
  };
  const { warehouseStock, selectedQuantity } = selectedWarehouseItem;

  return (
    <TableRow>
      <TableCell>{warehouseStock.product.name}</TableCell>
      <TableCell>{warehouseStock.product.activePrice?.price}</TableCell>
      <TableCell>{warehouseStock.quantity}</TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack>
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
          </Stack>
          <Typography>{selectedQuantity}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        {warehouseStock.product.activePrice?.price * warehouseStock.quantity}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleRemoveItem(warehouseStock.product.id)}>
          <DeleteOutline color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ItemsSummaryRow;
