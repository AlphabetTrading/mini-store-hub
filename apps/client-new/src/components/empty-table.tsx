import { TableRow, TableCell, Box, Typography } from "@mui/material";
import React from "react";

type Props = {
    colspan: number;
};

const EmptyTable = ({colspan}: Props) => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ pb: 8 }}>
        <Box
          alt="Empty"
          component="img"
          src="/assets/icons/empty.svg"
          sx={{
            height: "auto",
            maxWidth: "20%",
          }}
        ></Box>
        <Typography variant="subtitle2">No Items Selected</Typography>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTable;
