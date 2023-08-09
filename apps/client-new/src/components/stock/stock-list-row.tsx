import {
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  Switch,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";

import NextLink from "next/link";
import { StockItem } from "../../../types/product";

type Props = {
  warehouseStock: StockItem;
  handleItemToggle: (id: string) => void;
  selected: boolean;
};
const categoryOptions = [
  {
    label: "Biscuit",
    value: "biscuit",
  },
  {
    label: "Makeup",
    value: "makeup",
  },
  {
    label: "Oil",
    value: "oil",
  },
  {
    label: "Skincare",
    value: "skincare",
  },
  {
    label: "Jewelry",
    value: "jewelry",
  },
  {
    label: "Blouse",
    value: "blouse",
  },
];

const ItemListRow = ({ warehouseStock, handleItemToggle, selected }: Props) => {
  const { product, quantity } = warehouseStock;
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => handleItemToggle(product.id)}>
            {selected ? <ExpandMore /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{product.name}</TableCell>
        <TableCell align="left">{product.serialNumber}</TableCell>
        <TableCell align="left">{product.category.name}</TableCell>
        <TableCell align="left">{quantity}</TableCell>
        <TableCell align="left">{product.unit}</TableCell>
        <TableCell align="left">
          {product.activePrice?.purchasedPrice}
        </TableCell>
        <TableCell align="left">{product.activePrice?.price}</TableCell>
      </TableRow>
      {selected && (
        <TableRow>
          <TableCell
            colSpan={8}
            sx={{
              p: 0,
              position: "relative",
              "&:after": {
                position: "absolute",
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: "primary.main",
                width: 3,
                height: "calc(100% + 1px)",
              },
            }}
          >
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6">Basic details</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        defaultValue={product.name}
                        fullWidth
                        label="Product name"
                        name="name"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        defaultValue={product.serialNumber}
                        disabled
                        fullWidth
                        label="Serial number"
                        name="serial-number"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        defaultValue={product.category}
                        fullWidth
                        label="Category"
                        select
                      >
                        {categoryOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6">Pricing and stocks</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={0}>
                    <Grid item md={6} xs={12}>
                      {/* <TextField
                        defaultValue={product.price}
                        fullWidth
                        label="Old price"
                        name="old-price"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {product.currency}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                      /> */}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {/* <TextField
                        defaultValue={product.price}
                        fullWidth
                        label="New price"
                        name="new-price"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        type="number"
                      /> */}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        component={NextLink}
                        href={`/items/edit/${product.id}`}
                      >
                        Edit Price History
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              sx={{ p: 2 }}
            >
              <Stack alignItems="center" direction="row" spacing={2}>
                <Button onClick={() => {}} type="submit" variant="contained">
                  Update
                </Button>
                <Button color="inherit" onClick={() => {}}>
                  Cancel
                </Button>
              </Stack>
              <div>
                <Button onClick={() => {}} color="error">
                  Delete product
                </Button>
              </div>
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ItemListRow;
