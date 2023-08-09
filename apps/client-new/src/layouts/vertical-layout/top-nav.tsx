import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
const TOP_NAV_HEIGHT = 64;
const SIDE_NAV_WIDTH = 280;
type Props = {
  onMobileNavOpen: () => void;
};
export const TopNav = ({ onMobileNavOpen }: Props) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {!lgUp && (
            <IconButton onClick={onMobileNavOpen}>
              <SvgIcon> <MenuIcon /></SvgIcon>
            </IconButton>
          )}

          {/* <SearchButton /> */}
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <IconButton onClick={() => signOut()}>
          <LogoutIcon />
          </IconButton>
          {/* <LanguageSwitch />
          <NotificationsButton />
          <ContactsButton />
          <AccountButton /> */}
        </Stack>
      </Stack>
    </Box>
  );
};
