import { Box, Chip, Stack, useTheme } from "@mui/material";
import React from "react";

type Props = {
  label: string;
  status: string;
};

const CustomChip = ({ label, status }: Props) => {
  const state = { status };

  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: (theme) => theme.palette.success.alpha12,
        color: (theme) => theme.palette.success.main,
      }}
    />
  );
};

export default CustomChip;
