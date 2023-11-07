"use client";

import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { RetailShop } from "../../../types/retail-shop";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  console.log(retailShop);
  const { data } = useSession();
  const router = useRouter();
  return (
    <TableRow
      sx={{
        textDecoration: "none",
        position: "relative",
        cursor: "pointer",
      }}
      hover
      onClick={() => router.push(`/admin/retail-shops/${retailShop.id}`)}
    >
      <TableCell align="left">{retailShop.name}</TableCell>
      <TableCell align="left">
        {retailShop.retailShopManager
          ? retailShop.retailShopManager?.firstName +
            " " +
            retailShop.retailShopManager?.lastName
          : "-"}
      </TableCell>
      <TableCell align="left">
        {retailShop.address?.formattedAddress
          ? retailShop.address.formattedAddress
          : "-"}
      </TableCell>
      <TableCell align="left">
        {retailShop.address?.lng && retailShop.address?.lat
          ? `${retailShop.address?.lat}, ${retailShop.address?.lng}}`
          : "-"}
      </TableCell>
    </TableRow>
  );
};

export default RetailShopsListRow;
