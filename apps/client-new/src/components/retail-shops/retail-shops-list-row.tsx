import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { User } from "../../../types/user";
import { RetailShop } from "../../../types/retail-shop";

type Props = {
  retailShop: RetailShop;
  handleItemToggle: (id: string) => void;
  selected: boolean;
};

const RetailShopsListRow = ({
  retailShop,
  handleItemToggle,
  selected,
}: Props) => {
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => handleItemToggle(retailShop.id)}>
            {selected ? <ExpandMore /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{retailShop.name}</TableCell>
        <TableCell align="left">
          {retailShop.retailShopManager?.firstName}{" "}
          {retailShop.retailShopManager?.lastName}
        </TableCell>
        <TableCell align="left">
          {retailShop.address?.street}, {retailShop.address?.city}
        </TableCell>
        <TableCell align="left">
          {retailShop.address?.lng}, {retailShop.address?.lat}
        </TableCell>
      </TableRow>
    </>
  );
};

export default RetailShopsListRow;
