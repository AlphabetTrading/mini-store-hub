import { Box, Drawer, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import SideNavSection from "./side-nav-section";
import NextLink from "next/link";
import { NavigationItem } from "../config";
import { Storefront } from "@mui/icons-material";

type Props = {
  navigationItems: NavigationItem[];
  unreadNotifications: number;
};
const SIDE_NAV_WIDTH = 280;
const SideNav = ({ navigationItems ,unreadNotifications}: Props) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open
      variant="persistent"
      PaperProps={{
        sx: {
          "--nav-bg": theme.palette.neutral[800],
          "--nav-color": theme.palette.common.white,
          "--nav-border-color": "transparent",
          "--nav-logo-border": theme.palette.neutral[700],
          "--nav-section-title-color": theme.palette.neutral[400],
          "--nav-item-color": theme.palette.neutral[400],
          "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
          "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
          "--nav-item-active-color": theme.palette.common.white,
          "--nav-item-disabled-color": theme.palette.neutral[500],
          "--nav-item-icon-color": theme.palette.neutral[400],
          "--nav-item-icon-active-color": theme.palette.primary.main,
          "--nav-item-icon-disabled-color": theme.palette.neutral[500],
          "--nav-item-chevron-color": theme.palette.neutral[600],
          "--nav-scrollbar-color": theme.palette.neutral[400],
          backgroundColor: "var(--nav-bg)",
          borderRightColor: "var(--nav-border-color)",
          borderRightStyle: "solid",
          borderRightWidth: 1,
          color: "var(--nav-color)",
          width: SIDE_NAV_WIDTH,
        },
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/admin/dashboard"
            sx={{
              borderColor: "var(--nav-logo-border)",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "flex",
              height: 35,
              p: "4px",
              width: 35,
            }}
          >
            <Storefront color={"primary"} fontSize="large" />
            {/* <Logo /> */}
          </Box>
          <Typography>Mini Store Hub</Typography>

          {/* <TenantSwitch sx={{ flexGrow: 1 }} /> */}
        </Stack>
        <Stack
          component="nav"
          spacing={2}
          sx={{
            flexGrow: 1,
            px: 2,
          }}
        >
          <SideNavSection navigationItems={navigationItems} unreadNotifications={unreadNotifications}/>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default SideNav;
