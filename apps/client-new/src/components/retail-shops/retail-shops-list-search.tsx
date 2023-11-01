import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/icons-material/Search";
import {
  Divider,
  Input,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const RetailShopsListSearch = ({ query, setQuery }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{ py: 1 }}
      >
        <OutlinedInput
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          placeholder="Search by name"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ flexGrow: 1 }}
        />
      </Stack>
      <Divider />
    </div>
  );
};

export default RetailShopsListSearch;
