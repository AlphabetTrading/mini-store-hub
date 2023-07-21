"use client";

import { Stack } from "@mui/material";
import React from "react";
import MobileNavItem from "./mobile-nav-item";
import { NAV_DATA } from "../nav-items";

type Props = {};

const MobileNavSection = (props: Props) => {
  const items = NAV_DATA;
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
      {items.map((item: any) => {
        return (
          <MobileNavItem
            active={false}
            disabled={item.disabled}
            icon={item.icon}
            key={item.title}
            label={item.label}
            // path={item.path}
            title={item.title}
          />
        );
      })}
    </Stack>
  );
};

export default MobileNavSection;
