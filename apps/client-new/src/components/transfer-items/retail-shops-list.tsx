import {
  Typography,
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { RetailShopsData, RETAIL_SHOPS } from "@/graphql/retail-shops/queries";
import StateHandler from "../state-handler";
import { Search } from "@mui/icons-material";
import { RetailShop } from "../../../types/retail-shop";

type Props = {
  setSelectedRetailShop: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRetailShop: string | null;
};

const RetailShopsList = ({
  setSelectedRetailShop,
  selectedRetailShop,
}: Props) => {
  const { data, loading, error } = useQuery<RetailShopsData>(RETAIL_SHOPS);
  const retailShops = data?.retailShops.items;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRetailShops, setFilteredRetailShops] = useState<RetailShop[]>(
    []
  );
  useEffect(() => {
    const filtered = retailShops?.filter((retailShop) => {
      return (
        retailShop.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retailShop.retailShopManager?.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        retailShop.retailShopManager?.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
    setFilteredRetailShops(filtered || []);
  }, [searchQuery, retailShops]);

  return (
    <StateHandler
      loading={loading}
      error={error}
      empty={data?.retailShops.items.length === 0}
    >
      <Stack sx={{ p: 3 }} spacing={2}>
        <OutlinedInput
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          fullWidth
          placeholder="Search by name or owner"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon>
                <Search />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ flexGrow: 1 }}
        />
        <form onSubmit={(event) => event.preventDefault()}>
          <Stack
            component={RadioGroup}
            onChange={(event) => {
              setSelectedRetailShop(event.currentTarget.value);
            }}
            spacing={2}
            sx={{ p: 3, overflow: "auto", display: "block" }}
            maxHeight={350}
            value={selectedRetailShop?.toString() || ""}
          >
            {filteredRetailShops?.map((retailShop, idx) => (
              <Paper
                key={idx}
                sx={{
                  alignItems: "flex-start",
                  display: "flex",
                  p: 2,
                }}
                variant="outlined"
              >
                <FormControlLabel
                  control={<Radio />}
                  key={idx}
                  label={
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">
                        {retailShop.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {`${retailShop.retailShopManager?.firstName || ""} ${
                          retailShop.retailShopManager?.lastName || ""
                        }`}
                      </Typography>
                    </Box>
                  }
                  value={retailShop.id}
                />
              </Paper>
            ))}
          </Stack>
        </form>
      </Stack>
    </StateHandler>
  );
};

export default RetailShopsList;
