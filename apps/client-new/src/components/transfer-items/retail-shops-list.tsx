import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { useQuery } from "@apollo/client";
import { RetailShopsData, RETAIL_SHOPS } from "@/graphql/retail-shops/queries";

type Props = {
  setSelectedRetailShop: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRetailShop:string|null;
};

const RetailShopsList = ({ setSelectedRetailShop ,selectedRetailShop}: Props) => {
  const { data, loading, error } = useQuery<RetailShopsData>(RETAIL_SHOPS);
  const retailShops = data?.retailShops.items;
  return loading ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ pb: 4, pt: 2 }}
    >
      <CircularProgress />
    </Box>
  ) : !data || error ? (
    <Alert severity="error">
      <div>
        <Typography color="inherit" variant="subtitle2">
          {error?.message}
        </Typography>
      </div>
    </Alert>
  ) : (
    <Box sx={{ p: 3 }}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Stack
          component={RadioGroup}
          onChange={(event) => {
            setSelectedRetailShop(event.currentTarget.value);
          }}
          spacing={3}
          value={selectedRetailShop?.toString()||""}
        >
          {retailShops?.map((retailShop, idx) => (
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
                      {`${retailShop.retailShopManager?.firstName} ${retailShop.retailShopManager?.lastName}`}
                    </Typography>
                  </Box>
                }
                value={retailShop.id}
              />
            </Paper>
          ))}
        </Stack>
      </form>
    </Box>
  );
};

export default RetailShopsList;
