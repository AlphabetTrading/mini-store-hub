import { Stack } from "@mui/material";
import React from "react";
import SideNavItem from "./side-nav-item";
import { usePathname } from "next/navigation";
import { NavigationItem } from "../config";

type Props = {
  navigationItems: NavigationItem[];
};

const SideNavSection = ({ navigationItems }: Props) => {
  const pathname = usePathname();
  return (
    <Stack component="ul" spacing={0.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {navigationItems.map((item) => (
        <SideNavItem
          icon={item.icon}
          title={item.title}
          path={item.path}
          active={pathname.includes(item.path)}
          key={item.title}
          // label={item.label}
          // disabled={item.disabled}
        />
      ))}
    </Stack>
  );
};

export default SideNavSection;
