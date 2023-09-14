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
import { signOut, useSession } from "next-auth/react";
import { NavigationItem } from "../config";
import LogoutIcon from "@mui/icons-material/Logout";
import { NotificationsButton } from "@/components/notification/notification-button";
import {
  NotificationByUserIdData,
  NotificationByUserIdVars,
  NOTIFICATIONS_BY_USERID,
  UNREAD_NOTIFICATIONS_COUNT,
  UnreadNotificationsCountData,
  UnreadNotificationsCountVars,
} from "@/graphql/notifications/queries";
import { useQuery } from "@apollo/client";

type Props = {
  onMobileNav: () => void;
  navigationItems: NavigationItem[];
  // unreadNotifications:number;
};

export const TopNav = ({ navigationItems, onMobileNav }: Props) => {
  // const { color = 'evident', onMobileNav, sections = [] } = props;
  const theme = useTheme();
  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  // const cssVars = useCssVars(color);
  const { data: sessionData } = useSession();
  const userId = (sessionData?.user as any).id || "";
  const { data, error, loading } = useQuery<
    NotificationByUserIdData,
    NotificationByUserIdVars
  >(NOTIFICATIONS_BY_USERID, {
    variables: {
      userId: userId,
    },
  });
  const { data: notificationCount } = useQuery<
    UnreadNotificationsCountData,
    UnreadNotificationsCountVars
  >(UNREAD_NOTIFICATIONS_COUNT, {
    variables: {
      userId: userId,
    },
  });
  const unreadNotifications =
    notificationCount?.unreadNotificationsCountByUserId;

  return (
    <Box
      component="header"
      sx={{
        "--nav-bg": theme.palette.neutral[50],
        "--nav-color": theme.palette.text.primary,
        "--nav-divider-color": theme.palette.neutral[200],
        "--nav-border-color": theme.palette.divider,
        "--nav-logo-border": theme.palette.neutral[200],
        "--nav-section-title-color": theme.palette.neutral[500],
        "--nav-item-color": theme.palette.neutral[500],
        "--nav-item-hover-bg": theme.palette.action.hover,
        "--nav-item-active-bg": theme.palette.action.selected,
        "--nav-item-active-color": theme.palette.text.primary,
        "--nav-item-disabled-color": theme.palette.neutral[400],
        "--nav-item-icon-color": theme.palette.neutral[400],
        "--nav-item-icon-active-color": theme.palette.primary.main,
        "--nav-item-icon-disabled-color": theme.palette.neutral[400],
        "--nav-item-chevron-color": theme.palette.neutral[400],
        "--nav-scrollbar-color": theme.palette.neutral[900],
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
            <IconButton onClick={onMobileNav}>
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
          <NotificationsButton
            unreadNotifications={unreadNotifications || 0}
            notifications={data?.allNotificationsByUserId || []}
          />
          {/* <ContactsButton /> */}
          {/* <AccountButton /> */}
          <IconButton onClick={() => signOut()}>
            <LogoutIcon />
          </IconButton>
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
              navigationItems={navigationItems}
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
