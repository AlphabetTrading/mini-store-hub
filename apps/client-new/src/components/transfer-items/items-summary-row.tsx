import React from "react";
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { SelectedRetailShopStockItem, SelectedStockItem } from "../../../types/stock-item";

type Props = {
  selectedWarehouseItem: SelectedRetailShopStockItem;
  handleRemoveItem(id: string): void;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<SelectedRetailShopStockItem[]>
  >;
  selectedItems: SelectedRetailShopStockItem[];
};

const ItemsSummaryRow = ({
  selectedWarehouseItem,
  handleRemoveItem,
  setSelectedItems,
  selectedItems,
}: Props) => {
  const handleItemQuantityChange = (
    selectedItem: SelectedRetailShopStockItem,
    val: number
  ) => {
    if (selectedItem.selectedQuantity + val <= 0) {
      setSelectedItems(
        selectedItems.filter(
          (item) =>
            item.retailShopStockItem.product.id !==
            selectedItem.retailShopStockItem.product.id
        )
      );
    } else if (
      selectedItem.selectedQuantity + val >
      selectedItem.retailShopStockItem.quantity
    ) {
      return;
    } else {
      selectedItem.selectedQuantity += val;
      setSelectedItems((prev) =>
        prev.map((item) => {
          if (
            item.retailShopStockItem.product.id ===
            selectedItem.retailShopStockItem.product.id
          ) {
            return selectedItem;
          } else {
            return item;
          }
        })
      );
    }
  };
  const { retailShopStockItem, selectedQuantity } = selectedWarehouseItem;

  return (
    <TableRow>
      <TableCell>
        <Stack>
          <Typography variant="body2">{retailShopStockItem.product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            SN-{retailShopStockItem.product.serialNumber}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>{retailShopStockItem.activePrice?.price}</TableCell>
      <TableCell>{retailShopStockItem.quantity}</TableCell>
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
          retailShopStockItem.activePrice?.price * selectedQuantity
        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleRemoveItem(retailShopStockItem.product.id)}>
          <DeleteOutline color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ItemsSummaryRow;
