"use client";

import { TopNav } from "@/layouts/horizontal-layout/top-nav";
import { useMobileNav } from "@/layouts/use-mobile-nav";
import { MobileNav } from "@/layouts/mobile-nav";
import { Theme, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigationItems } from "@/layouts/config";
import { NotificationByUserIdData, NotificationByUserIdVars, NOTIFICATIONS_BY_USERID } from "@/graphql/notifications/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

type Props = { children: React.ReactNode };
const HorizontalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  width: "100%",
  flexDirection: "column",
});

const HorizontalLayoutRoot = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
});

const Layout = ({ children }: Props) => {
  const mobileNav = useMobileNav();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const navigationData = useNavigationItems();
 
  return (
    <>
      <TopNav
        // color={navColor}

    
        onMobileNav={mobileNav.handleOpen}
        navigationItems={navigationData.warehouseManager}
        // sections={sections}
      />
      {!lgUp && (
        <MobileNav
          navigationItems={navigationData.warehouseManager}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
        />
      )}
      <HorizontalLayoutRoot>
        <HorizontalLayoutContainer>{children}</HorizontalLayoutContainer>
      </HorizontalLayoutRoot>
    </>
  );
};

export default Layout;
