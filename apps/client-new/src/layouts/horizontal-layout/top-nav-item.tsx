import { Box, ButtonBase, SvgIconProps } from "@mui/material";
import Link from "next/link";
import React from "react";

export type TopNavProps = {
  disabled?: boolean;
  active?: boolean;
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  label?: string;
  path: string;
};

const TopNavItem = (props: TopNavProps) => {
  return (
    <li>
      <ButtonBase
        disabled={props.disabled}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          px: "16px",
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
        component={Link}
        href={props.path}
      >
        {props.icon && (
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
        )}
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
          <Box component="span" sx={{ ml: 1 }}>
            {props.label}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};

export default TopNavItem;
