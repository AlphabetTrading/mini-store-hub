import { ButtonBase, Box, SvgIconProps } from "@mui/material";
import { title } from "process";
import React from "react";

export type SideNavProps = {
  disabled?: boolean;
  active?: boolean;
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  label?: string;
  path: string;
};

const SideNavItem = (props: SideNavProps) => {
  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16 px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(props.active && {
            backgroundColor: "var(--nav-item-active-bg)",
          }),
          "&:hover": {
            backgroundColor: "var(--nav-item-hover-bg)",
          },
        }}
        href={props.path}
      >
        <Box
          component="span"
          sx={{
            alignItems: "center",
            color: "var(--nav-item-icon-color)",
            display: "inline-flex",
            justifyContent: "center",
            mr: 2,
            ...(props.active && {
              color: "var(--nav-item-icon-active-color)",
            }),
          }}
        >
          {props.icon}
        </Box>

        <Box
          component="span"
          sx={{
            color: "var(--nav-item-color)",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(props.active && {
              color: "var(--nav-item-active-color)",
            }),
            ...(props.disabled && {
              color: "var(--nav-item-disabled-color)",
            }),
          }}
        >
          {props.title}
        </Box>
        {props.label && (
          <Box component="span" sx={{ ml: 2 }}>
            {props.label}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};

export default SideNavItem;
