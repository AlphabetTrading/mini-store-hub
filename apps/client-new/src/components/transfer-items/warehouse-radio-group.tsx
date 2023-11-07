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
import { WAREHOUSES, WarehousesData } from "@/graphql/warehouses/queries";
import { Warehouse } from "../../../types/warehouse";

type Props = {
  setSelectedWarehouse: React.Dispatch<React.SetStateAction<string | null>>;
  selectedWarehouse: string | null;
};

const WarehouseRadioGroup = ({
  setSelectedWarehouse,
  selectedWarehouse,
}: Props) => {
  const { data, loading, error } = useQuery<WarehousesData>(WAREHOUSES);
  const warehouses = data?.warehouses.items;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWarehouses, setFilteredWarehouses] = useState<Warehouse[]>([]);
  useEffect(() => {
    const filtered = warehouses?.filter((warehouse) => {
      return (
        warehouse.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        warehouse.warehouseManager?.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        warehouse.warehouseManager?.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
    setFilteredWarehouses(filtered || []);
  }, [searchQuery, warehouses]);

  return (
    <StateHandler
      loading={loading}
      error={error}
      empty={data?.warehouses.items.length === 0}
    >
      <Stack sx={{ p: 3 }} spacing={2}>
        <OutlinedInput
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          fullWidth
          placeholder="Search by name or manager"
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
              setSelectedWarehouse(event.currentTarget.value);
            }}
            spacing={2}
            sx={{ p: 3, overflow: "auto", display: "block" }}
            maxHeight={350}
            value={selectedWarehouse?.toString() || ""}
          >
            {filteredWarehouses?.map((warehouse, idx) => (
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
                        {warehouse.name},{" "}
                        <Typography variant="body2">
                          {warehouse.address?.formattedAddress}
                        </Typography>
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {`${warehouse.warehouseManager?.firstName || ""} ${
                          warehouse.warehouseManager?.lastName || ""
                        }`}
                      </Typography>
                    </Box>
                  }
                  value={warehouse.id}
                />
              </Paper>
            ))}
          </Stack>
        </form>
      </Stack>
    </StateHandler>
  );
};

export default WarehouseRadioGroup;
