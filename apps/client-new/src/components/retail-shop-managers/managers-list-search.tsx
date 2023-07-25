import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/icons-material/Search";
import { Box, Divider, Input, Stack, Typography } from "@mui/material";

type Props = {};

const ManagersListSearch = (props: Props) => {
  return (
    <>
      <Stack alignItems="center" spacing={2} sx={{ p: 2 }} direction="row">
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
        <Input disableUnderline placeholder="Search by product name" />
      </Stack>
      <Divider />
      {/* <Box sx={{ p: 2.5 }}>
        <Typography color="text.secondary" variant="subtitle2">
          No filters applied
        </Typography>
      </Box>
      <Divider /> */}
    </>
  );
};

export default ManagersListSearch;
