import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import CustomChip from "../custom-chip";
import StockPriceHistory from "./stock-price-history";
import {RetailShopStockItem } from "../../../types/stock-item";

type Props = {
  retailShopStock: RetailShopStockItem;
  selectedStockItem: string | null;
  setSelectedStockItem: React.Dispatch<React.SetStateAction<string | null>>;
};

const RetailShopStockItem = (props: Props) => {
  const { selectedStockItem, setSelectedStockItem, retailShopStock } = props;
  const { product, quantity,activePrice } = retailShopStock;
  const isCurrent = selectedStockItem === retailShopStock.product.id;
  const handleSelectItem = (productId:string)=>{
    setSelectedStockItem((prev)=>{
      if(prev === productId) return null;
      return productId;
    })
  }
  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Stack>
            <Typography variant="body2">{product.name}</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >{`SN #${product.serialNumber}`}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <CustomChip label={product.category.name} />
        </TableCell>
        <TableCell align="left">
          <CustomChip label={product.unit} status="neutral" />
        </TableCell>
        <TableCell align="left">{quantity}</TableCell>

        <TableCell align="left">
          {(activePrice?.purchasedPrice)?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })||"N/A"}
        </TableCell>
        <TableCell align="left">
          {(activePrice?.price)?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })||"N/A"}
        </TableCell>
        <TableCell align="left">
          {(activePrice?.price * quantity)?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })||"N/A"}
        </TableCell>
        <TableCell>
          <Button onClick={()=>handleSelectItem(product.id)}>Price History</Button>
        </TableCell>
      </TableRow>
      {isCurrent &&  
      <TableRow>
        <TableCell colSpan={8}>
          <StockPriceHistory productId={product.id}/>
      
        </TableCell>
      </TableRow>
      }
    </>
  );
};

export default RetailShopStockItem;
