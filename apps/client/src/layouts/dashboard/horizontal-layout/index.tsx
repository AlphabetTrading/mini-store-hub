import { Box, Theme, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { TopNav } from "./top-nav";
import { useMobileNav } from "./use-mobile-nav";

type Props = {
  children: React.ReactNode;
};

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

const HorizontalLayout = ({ children }: Props) => {
  const mobileNav = useMobileNav();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  return (
    <>
      <TopNav
        // color={navColor}
        onMobileNav={mobileNav.handleOpen}
        // sections={sections}
      />
      {!lgUp && <Box></Box>}
      <HorizontalLayoutRoot>
        <HorizontalLayoutContainer>{children}</HorizontalLayoutContainer>
      </HorizontalLayoutRoot>
    </>
  );
};

export default HorizontalLayout;
