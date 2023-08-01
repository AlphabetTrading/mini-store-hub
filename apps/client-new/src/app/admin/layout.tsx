"use client";

import AdminGuard from "@/components/AdminGuard";
import { TopNav } from "@/layouts/horizontal-layout/top-nav";
import { useMobileNav } from "@/layouts/use-mobile-nav";
import { MobileNav } from "@/layouts/mobile-nav";
import { Theme, styled, useMediaQuery } from "@mui/material";
import React from "react";
import SideNav from "@/layouts/vertical-layout/side-nav";
import { useNavigationItems } from "@/layouts/config";
import { signOut } from "next-auth/react";
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
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const navigationData = useNavigationItems();
  return (
    <>
      <SideNav
        // color={navColor}
        // sections={sections}
        navigationItems={navigationData.admin}
      />
      {!lgUp && (
        <MobileNav
          navigationItems={navigationData.admin}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
        />
      )}
      <VerticalLayoutRoot>
        {/* <button onClick={() => signOut()}>Logout</button> */}
        <VerticalLayoutContainer>{children}</VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  );
};

export default Layout;
