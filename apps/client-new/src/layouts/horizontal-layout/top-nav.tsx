import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TopNavSection from "./top-nav-section";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {
  onMobileNav: () => void;
};

export const TopNav = (props: Props) => {
  // const { color = 'evident', onMobileNav, sections = [] } = props;
  const theme = useTheme();
  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  // const cssVars = useCssVars(color);

  return (
    <Box
      component="header"
      sx={{
        "--nav-bg": theme.palette.neutral800,
        "--nav-color": theme.palette.common.white,
        "--nav-divider-color": theme.palette.neutral700,
        "--nav-border-color": "transparent",
        "--nav-logo-border": theme.palette.neutral700,
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
        borderBottomColor: "var(--nav-border-color)",
        borderBottomStyle: "solid",
        borderBottomWidth: 3,
        color: "var(--nav-color)",
        left: 0,
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 1,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {!mdUp && (
            <IconButton onClick={props.onMobileNav}>
              <SvgIcon>
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          )}

          <Box
            //   href={paths.index}

            sx={{
              borderColor: "var(--nav-logo-border)",
              borderRadius: 1,
              borderStyle: "solid",
              borderWidth: 1,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              p: "4px",
              width: 40,
            }}
          >
            <StorefrontIcon color={"primary"} fontSize="large" />
            {/* <Logo /> */}
          </Box>
          <Typography fontWeight={200}>Mini Store HUB</Typography>
          {/* <TenantSwitch /> */}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          {/* <LanguageSwitch /> */}
          {/* <NotificationsButton /> */}
          {/* <ContactsButton /> */}
          {/* <AccountButton /> */}
          <IconButton onClick={() => signOut()}>Logout</IconButton>
        </Stack>
      </Stack>
      {mdUp && (
        <Box
          sx={{
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: "var(--nav-divider-color)",
          }}
        >
          {/* <Scrollbar
            sx={{
              "& .simplebar-scrollbar:before": {
                background: "var(--nav-scrollbar-color)",
              },
            }}
          > */}
          <Stack
            alignItems="center"
            component="nav"
            direction="row"
            spacing={1}
            sx={{
              px: 2,
              py: 1.5,
              borderWidth: 3,
              borderColor: "yellow",
            }}
          >
            {/* {sections.map((section, index) => ( */}
            <TopNavSection
            // items={section.items}
            // key={index}
            // pathname={pathname}
            // subheader={section.subheader}
            />
            {/* ))} */}
          </Stack>
          {/* </Scrollbar> */}
        </Box>
      )}
    </Box>
  );
};
