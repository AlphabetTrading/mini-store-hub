import { Box, Chip, Stack, useTheme } from "@mui/material";
import React from "react";

type Props = {
  label: string;
  status: string;
};

const CustomChip = ({ label, status }: Props) => {
  const state = { status };
  //state is 'error' or 'success'
  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: (theme) =>
          status === "success"
            ? theme.palette.success.alpha12
            : theme.palette.error.alpha12,
        color: (theme) =>
          status === "success"
            ? theme.palette.success.main
            : theme.palette.error.main,
      }}
    />
  );
};

export default CustomChip;
