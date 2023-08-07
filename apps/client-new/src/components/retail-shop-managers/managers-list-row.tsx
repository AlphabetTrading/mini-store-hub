import {
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { User } from "../../../types/user";

type Props = {
  retailShopManager: User;
  handleItemToggle: (id: string) => void;
  selected: boolean;
};

const ManagersListRow = ({
  retailShopManager,
  handleItemToggle,
  selected,
}: Props) => {
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => handleItemToggle(retailShopManager.id)}>
            {selected ? <ExpandMore /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{retailShopManager.firstName}</TableCell>
        <TableCell align="left">{retailShopManager.lastName}</TableCell>
        <TableCell align="left">{retailShopManager.phone}</TableCell>
        <TableCell align="left">
          {retailShopManager?.userProfile?.address?.city}
        </TableCell>
      </TableRow>
    </>
  );
};

export default ManagersListRow;
