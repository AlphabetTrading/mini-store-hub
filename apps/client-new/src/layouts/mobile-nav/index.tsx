import { Box, Drawer, Stack, Typography, useTheme } from "@mui/material";
import MobileNavSection from "./mobile-nav-section";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavigationItem } from "../config";

const MOBILE_NAV_WIDTH = 280;
type Props = {
  onClose: () => void;
  open: boolean;
  navigationItems: NavigationItem[];
  unreadNotifications?: number;
};
export const MobileNav = ({
  open,
  onClose,
  navigationItems,
  unreadNotifications,
}: Props) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          "--nav-bg": theme.palette.neutral800,
          "--nav-color": theme.palette.common.white,
          "--nav-logo-border": theme.palette.neutral700,
          "--nav-section-title-color": theme.palette.neutral400,
          "--nav-item-color": theme.palette.neutral400,
          "--nav-item-hover-bg": "rgba(255, 255, 255, 0.04)",
          "--nav-item-active-bg": "rgba(255, 255, 255, 0.04)",
          "--nav-item-active-color": theme.palette.common.white,
          "--nav-item-disabled-color": theme.palette.neutral500,
          "--nav-item-icon-color": theme.palette.neutral400,
          "--nav-item-icon-active-color": theme.palette.primary.main,
          "--nav-item-icon-disabled-color": theme.palette.neutral500,
          "--nav-item-chevron-color": theme.palette.neutral600,
          "--nav-scrollbar-color": theme.palette.neutral400,
          backgroundColor: "var(--nav-bg)",
          color: "var(--nav-color)",
          width: MOBILE_NAV_WIDTH,
        },
      }}
      variant="temporary"
      onClose={onClose}
      open={open}
    >
      {/* <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "var(--nav-scrollbar-color)",
          },
        }}
      > */}
      <Stack sx={{ height: "100%" }}>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 3 }}>
          <Box
            //   href={paths.index}
            alignItems="center"
            justifyContent="center"
 
            sx={{
              borderColor: "var(--nav-logo-border)",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "flex",
              height: 40,
              p: "3px",
              width: 40,
            }}
          >
            <StorefrontIcon color={"primary"} fontSize="large" />

            {/* <Logo /> */}
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Mini Store Hub
          </Typography>
        </Stack>
        <Stack
          component="nav"
          spacing={2}
          sx={{
            flexGrow: 1,
            px: 2,
          }}
        >
          <MobileNavSection
            navigationItems={navigationItems}
            unreadNotifications={unreadNotifications}
          />
        </Stack>
      </Stack>
      {/* </Scrollbar> */}
    </Drawer>
  );
};
