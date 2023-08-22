import { Box, Chip, Stack, useTheme } from "@mui/material";
import React from "react";

type Props = {
  label: string;
  status?: string;
};

const CustomChip = ({ label, status }: Props) => {
  return (
    <Chip
      label={label}
      sx={{
        width: "fit-content",
        backgroundColor: (theme) => {
          switch (status) {
            case "success":
              return theme.palette.success.alpha12;
            case "error":
              return theme.palette.error.alpha12;
            default:
              return theme.palette.indigo.alpha12;
          }
        },

        color: (theme) => {
          switch (status) {
            case "success":
              return theme.palette.success.main;
            case "error":
              return theme.palette.error.main;
            default:
              return theme.palette.indigo.main;
          }
        },
      }}
    />
  );
};

export default CustomChip;
