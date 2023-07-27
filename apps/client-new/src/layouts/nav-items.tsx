"use client";

import { SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { TopNavProps } from "./horizontal-layout/top-nav-item";

export const NAV_DATA: TopNavProps[] = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Retail Shop Managers",
    path: "/retail-shop-managers",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Items",
    path: "/items",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Retail Shops",
    path: "/retail-shops",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Transfer Items",
    path: "/transfer-items",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Transaction History",
    path: "/transaction-history",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Process Incoming Items",
  //   path: "",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <AddHomeOutlinedIcon />
  //     </SvgIcon>
  //   ),
  // },
];
