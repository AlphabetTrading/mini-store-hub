import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { User } from "../../../types/user";
import { RetailShop } from "../../../types/retail-shop";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

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
  const { data } = useSession();
  return (
    <>
      <TableRow
        {...((data?.user as any).role == "ADMIN" && {
          component: NextLink,
          href: `/admin/retail-shops/${retailShop.id}`,
          sx: {
            textDecoration: "none",
            position: "relative",
          },
          hover: true,
        })}
      >
        <TableCell align="left">{retailShop.name}</TableCell>
        <TableCell align="left">
          {retailShop.retailShopManager?.firstName}{" "}
          {retailShop.retailShopManager?.lastName}
        </TableCell>
        <TableCell align="left">
          {retailShop.address?.street &&
            retailShop.address?.city &&
            (retailShop.address?.street, retailShop.address?.city)}
        </TableCell>
        <TableCell align="left">
          {retailShop.address?.lng &&
            retailShop.address?.lat &&
            (retailShop.address?.lng, retailShop.address?.lat)}
        </TableCell>
        <ChevronRightIcon
          sx={{
            position: "absolute",
            top: "50%",
            bottom: "50%",
            margin: "auto",
            right: 8,
          }}
        />
      </TableRow>
    </>
  );
};

export default RetailShopsListRow;
