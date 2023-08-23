import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/icons-material/Search";
import { Divider, Input, Stack } from "@mui/material";

type Props = {};

const RetailShopsListSearch = (props: Props) => {
  return (
    <>
      <Stack alignItems="center" spacing={2} sx={{ p: 2 }} direction="row">
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
        <Input disableUnderline placeholder="Search by name" />
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

export default RetailShopsListSearch;
