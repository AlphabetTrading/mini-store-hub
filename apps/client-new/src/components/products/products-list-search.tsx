import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/icons-material/Search";
import {
  Box,
  Divider,
  Input,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  filter: {
    query: string;
    filter: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      query: string;
      filter: string;
    }>
  >;
};

const sortOptions = [
  {
    label: "Last Updated At (Newer-Older)",
    value: "updatedAt|desc",
  },
  {
    label: "Last Updated At (Older-Newer)",
    value: "updatedAt|asc",
  },
  {
    label: "Product Name (A-Z)",
    value: "name|asc",
  },
  {
    label: "Product Name (Z-A)",
    value: "name|desc",
  },
  {
    label: "Category Name (A-Z)",
    value: "categoryName|asc",
  },
  {
    label: "Category Name (Z-A)",
    value: "categoryName|desc",
  },
  {
    label: "Serial Number (A-Z)",
    value: "serialNumber|asc",
  },
  {
    label: "Serial Number (Z-A)",
    value: "serialNumber|desc",
  },
];

const ProductsListSearch = ({ filter, setFilter }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      {/* <Stack alignItems="center" spacing={2} sx={{ p: 2 }} direction="row">
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
        <Input disableUnderline placeholder="Search by product name" />
      </Stack> */}
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{ py: 3 }}
      >
        <OutlinedInput
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              query: e.target.value,
            }));
          }}
          value={filter.query}
          placeholder="Search by product name"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Sort By"
          name="sort"
          select
          SelectProps={{ native: true }}
          value={filter.filter}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              filter: e.target.value,
            }));
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
      <Divider />
    </div>
  );
};

export default ProductsListSearch;
