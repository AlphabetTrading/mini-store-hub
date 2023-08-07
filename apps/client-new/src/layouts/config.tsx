import { SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useMemo } from "react";

export interface NavigationItem {
  title: string;
  path: string;
  icon: React.ReactElement;
}

export const useNavigationItems = () => {
  return useMemo(() => {
    return {
      admin: [
        {
          title: "Overview",
          path: "/admin/dashboard",
          icon: (
            <SvgIcon fontSize="small">
              <AddHomeOutlinedIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Products",
          path: "/admin/products",
          icon: (
            <SvgIcon fontSize="small">
              <AddHomeOutlinedIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Users",
          path: "/admin/users",
          icon: (
            <SvgIcon fontSize="small">
              <AddHomeOutlinedIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Retail Shops",
          path: "/admin/retail-shops",
          icon: (
            <SvgIcon fontSize="small">
              <AddHomeOutlinedIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Warehouses",
          path: "/admin/warehouses",
          icon: (
            <SvgIcon fontSize="small">
              <AddHomeOutlinedIcon />
            </SvgIcon>
          ),
        },
      ],
      warehouseManager: [
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
          title: "Stock",
          path: "/stock",
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
      ],
    };
  }, []);
};
