"use client";

import { Stack } from "@mui/material";
import React from "react";
import MobileNavItem from "./mobile-nav-item";
import { usePathname } from "next/navigation";

type Props = {
  navigationItems:any
};

const MobileNavSection = ({navigationItems}: Props) => {
  const pathname = usePathname();
  return (
    <Stack
      component="ul"
      spacing={0.5}
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
      }}
    >
      {navigationItems.map((item: any) => {


        return (
          <MobileNavItem
            active={pathname.includes(item.path)}
            disabled={item.disabled}
            icon={item.icon}
            key={item.title}
            label={item.label}
            path={item.path}
            title={item.title}
          />
        );
      })}
    </Stack>
  );
};

export default MobileNavSection;
