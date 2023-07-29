import { Box } from "@mui/material";
import React from "react";

type Props = {};

const BreadcrumbsSeparator = (props: Props) => {
  return (
    <Box
      sx={{
        height: 4,
        width: 4,
        borderRadius: "50%",
        backgroundColor: "neutral500",
      }}
    />
  );
};

export default BreadcrumbsSeparator;
