import { Chip, SvgIcon } from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useMemo } from "react";
import { RetailShopManagerIcon } from "@/components/icons/retail-shop-manager";
import { RetailShopsIcon } from "@/components/icons/retail-shops";
import TransferItemsIcon from "@/icons/transfer-items-icon";
import TransactionHistoryIcon from "@/icons/transaction-history-icon";
import ProductsIcon from "@/icons/products-icon";
import UsersIcon from "@/icons/users-icon";
import BarChartIcon from "@/icons/barchart-icon";
import CategoryIcon from "@/icons/category-icon";
import RetailShopIcon from "@/icons/retail-shop-icon";
import WarehouseIcon from "@/icons/warehouse-icon";
import NotificationIcon from "@/icons/notification-icon";
import StockIcon from "@/icons/stock-icon";
export interface NavigationItem {
  title: string;
  path: string;
  icon: React.ReactElement;
  chip?: (count: number) => React.ReactElement;
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
              <BarChartIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Categories",
          path: "/admin/categories",
          icon: (
            <SvgIcon fontSize="small">
              <CategoryIcon />
            </SvgIcon>
          ),
        },

        {
          title: "Products",
          path: "/admin/products",
          icon: (
            <SvgIcon fontSize="small">
              <ProductsIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Users",
          path: "/admin/users",
          icon: (
            <SvgIcon fontSize="small">
              <UsersIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Retail Shops",
          path: "/admin/retail-shops",
          icon: (
            <SvgIcon fontSize="small">
              <RetailShopIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Warehouses",
          path: "/admin/warehouses",
          icon: (
            <SvgIcon fontSize="small">
              <WarehouseIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Notifications",
          path: "/admin/notifications",
          icon: (
            <SvgIcon fontSize="small">
              <NotificationIcon />
            </SvgIcon>
          ),
          chip: (count: number) =>
            count === 0 ? (
              <></>
            ) : (
              <Chip color="primary" label={count} size="small" />
            ),
        },
        {
          title: "Transfer Items",
          path: "/admin/transfer-items",
          icon: (
            <SvgIcon fontSize="small">
              <TransferItemsIcon />
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
              <BarChartIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Retail Shop Managers",
          path: "/retail-shop-managers",
          icon: (
            <SvgIcon fontSize="small">
              <UsersIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Stock",
          path: "/stock",
          icon: (
            <SvgIcon fontSize="small">
              <StockIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Retail Shops",
          path: "/retail-shops",
          icon: (
            <SvgIcon fontSize="small">
              <RetailShopIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Transfer Items",
          path: "/transfer-items",
          icon: (
            <SvgIcon fontSize="small">
              <TransferItemsIcon />
            </SvgIcon>
          ),
        },
        {
          title: "Transaction History",
          path: "/transaction-history",
          icon: (
            <SvgIcon fontSize="small">
              <TransactionHistoryIcon />
            </SvgIcon>
          ),
        },
      ],
    };
  }, []);
};
