"use client";

import { TopNav } from "@/layouts/vertical-layout/top-nav";
import { useMobileNav } from "@/layouts/use-mobile-nav";
import { MobileNav } from "@/layouts/mobile-nav";
import { styled, useMediaQuery } from "@mui/material";
import React from "react";
import SideNav from "@/layouts/vertical-layout/side-nav";
import { useNavigationItems } from "@/layouts/config";
import {
  NotificationByUserIdData,
  NotificationByUserIdVars,
  NOTIFICATIONS_BY_USERID,
  UNREAD_NOTIFICATIONS_COUNT,
  UnreadNotificationsCountData,
  UnreadNotificationsCountVars,
} from "@/graphql/notifications/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
const SIDE_NAV_WIDTH = 280;
type Props = { children: React.ReactNode };
const VerticalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const VerticalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const Layout = ({ children }: Props) => {
  const mobileNav = useMobileNav();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { data: sessionData } = useSession();
  const userId = (sessionData?.user as any).id || "";
  const navigationData = useNavigationItems();
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
    <>
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      {lgUp && (
        <SideNav
          // color={navColor}
          // sections={sections}
          unreadNotifications={unreadNotifications || 0}
          navigationItems={navigationData.admin}
        />
      )}
      {!lgUp && (
        <MobileNav
          unreadNotifications={unreadNotifications || 0}
          navigationItems={navigationData.admin}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
        />
      )}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};

export default Layout;
