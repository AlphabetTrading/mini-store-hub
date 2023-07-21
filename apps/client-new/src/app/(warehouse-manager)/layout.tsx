"use client"

import { TopNav } from '@/layouts/horizontal-layout/top-nav';
import { useMobileNav } from '@/layouts/horizontal-layout/use-mobile-nav';
import { MobileNav } from '@/layouts/mobile-nav';
import { Theme, styled, useMediaQuery } from '@mui/material';
import React from 'react'

type Props = {children:React.ReactNode}
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
  

const layout = ({children}: Props) => {
    const mobileNav = useMobileNav();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  
    return (
      <>
        <TopNav
          // color={navColor}
          onMobileNav={mobileNav.handleOpen}
          // sections={sections}
        />
        {!lgUp && <MobileNav onClose={mobileNav.handleClose} open={mobileNav.open}/>}
        <HorizontalLayoutRoot>
          <HorizontalLayoutContainer>{children}</HorizontalLayoutContainer>
        </HorizontalLayoutRoot>
      </>
    );
}

export default layout