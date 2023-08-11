import { SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useMemo } from "react";
import { RetailShopManagerIcon } from "@/components/icons/retail-shop-manager";
import { StockIcon } from "@/components/icons/stock";
import { RetailShopsIcon } from "@/components/icons/retail-shops";
import { TransferItemsIcon } from "@/components/icons/transfer-items";
import { TransactionHistoryIcon } from "@/components/icons/transaction-history";
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
          title: "Categories",
          path: "/admin/categories",
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
          icon: <SvgIcon fontSize="small" component={RetailShopManagerIcon} />,
        },
        {
          title: "Stock",
          path: "/stock",
          icon: (
            <SvgIcon fontSize="small" color="action" component={StockIcon} />
          ),
        },
        {
          title: "Retail Shops",
          path: "/retail-shops",
          icon: <SvgIcon fontSize="small" component={RetailShopsIcon} />,
        },
        {
          title: "Transfer Items",
          path: "/transfer-items",
          icon: <SvgIcon fontSize="small" component={TransferItemsIcon} />,
        },
        {
          title: "Transaction History",
          path: "/transaction-history",
          icon: <SvgIcon fontSize="small" component={TransactionHistoryIcon} />,
        },
      ],
    };
  }, []);
};
