import { SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { TopNavProps } from "./horizontal-layout/top-nav-item";

export const NavItems: TopNavProps[] = [
  {
    title: "Overview",
    // path:"",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Retail Store Managers",
    // path: "",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Items",
    // path:"",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Retail Shops",
    // path: "",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Warehouse Checkout",
    // path: "",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Transaction History",
    // path: "",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Process Incoming Items",
    // path: "",
    icon: (
      <SvgIcon fontSize="small">
        <AddHomeOutlinedIcon />
      </SvgIcon>
    ),
  },
];
