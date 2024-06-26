import { Box, Drawer, Stack, useTheme } from "@mui/material";
import { Scrollbar } from "../../../components/Scrollbar";
import { NavItems } from "../nav-items";
import MobileNavItem from "./mobile-nav-item";
import MobileNavSection from "./mobile-nav-section";
import StorefrontIcon from "@mui/icons-material/Storefront";


const MOBILE_NAV_WIDTH = 280;
type Props = {
  onClose: () => void;
  open: boolean;
};
export const MobileNav = (props: Props) => {
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
      onClose={props.onClose}
      open={props.open}
    >
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "var(--nav-scrollbar-color)",
          },
        }}
      >
        <Stack sx={{ height: "100%" }}>
          <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 3 }}>
            <Box
              //   component={RouterLink}
              //   href={paths.index}
              sx={{
                borderColor: "var(--nav-logo-border)",
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 1,
                display: "flex",
                height: 40,
                p: "4px",
                width: 40,
              }}
            >
            <StorefrontIcon color={"primary"} fontSize="large" />

              {/* <Logo /> */}
            </Box>
          </Stack>
          <Stack
            component="nav"
            spacing={2}
            sx={{
              flexGrow: 1,
              px: 2,
            }}
          >
           <MobileNavSection/>
          </Stack>
        </Stack>
      </Scrollbar>
    </Drawer>
  );
};
