import {
  Drawer,
  Stack,
  Typography,
  Card,
  TextField,
  Button,
  Alert,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Checkbox,
  TableContainer,
  SvgIcon,
  Input,
} from "@mui/material";
import React from "react";
import { SelectedStockItem, StockItem } from "../../../types/stock-item";
import { Meta } from "../../../types/common";
import Pagination from "../Pagination";
import CustomChip from "../custom-chip";
import SearchIcon from "@mui/icons-material/Search";
import StateHandler from "../state-handler";
import { ApolloError } from "@apollo/client";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddItem: (item: StockItem, quantity: number) => void;
  selectedItemsId: string[];
  retailShopId: string;
  retailShopStocks: StockItem[];
  meta?: Meta;
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  retailShopStockLoading: boolean;
  retailShopStockError: ApolloError | undefined;
};

const validateQuantity = (value: number, max: number) => {
  let error;
  if (value <= 0) {
    error = "Quantity must be greater than 0";
  } else if (value > max) {
    error = `Quantity must be less than or equal to ${max}`;
  }
  return error;
};
const SaleTransactionItemsDrawer = ({
  open,
  setOpen,
  handleAddItem,
  selectedItemsId,
  retailShopId,
  retailShopStocks,
  meta,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  searchQuery,
  setSearchQuery,
  retailShopStockLoading,
  retailShopStockError,
}: Props) => {
  const [selectedItems, setSelectedItems] = React.useState<SelectedStockItem[]>(
    []
  );

  return (
    <Drawer
      anchor="right"
      onClose={() => setOpen(false)}
      open={open}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 700,
        },
      }}
    >
      <Stack sx={{ px: 4, py: 8 }} spacing={2}>
        <Typography variant="h6">Add Item</Typography>
        <Card sx={{ p: 4 }}>
          <Stack alignItems="center" spacing={2} sx={{ p: 2 }} direction="row">
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
            <Input
              disableUnderline
              placeholder="Search by name or serial number"
              value={searchQuery}
              fullWidth
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Stack>
          <TableContainer sx={{ overflowX: "auto" }}>
            <StateHandler
              error={retailShopStockError}
              loading={retailShopStockLoading}
            >
              <Table sx={{ minWidth: 300 }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {retailShopStocks?.map((item, idx) => {
                    const currentItem = selectedItems.find(
                      (selectedItem) =>
                        selectedItem.stockItem.product.id === item.product.id
                    );
                    const helperText = validateQuantity(
                      currentItem?.selectedQuantity as number,
                      item.quantity
                    );
                    // console.log(currentItem)
                    return (
                      <TableRow hover key={idx}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.some(
                              (i) => i.stockItem.product.id === item.product.id
                            )}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (event.target.checked) {
                                setSelectedItems([
                                  ...selectedItems,
                                  { stockItem: item, selectedQuantity: 1 },
                                ]);
                              } else {
                                setSelectedItems(
                                  selectedItems.filter(
                                    (i) =>
                                      i.stockItem.product.id !== item.product.id
                                  )
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">
                              {item.product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              SN- {item.product.serialNumber}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <CustomChip
                            label={item.product.category.name}
                          ></CustomChip>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>

                        <TableCell>
                          <TextField
                            error={Boolean(helperText)}
                            // fullWidth
                            helperText={helperText}
                            label="Select Quantity"
                            name="Select Quantity"
                            type="number"
                            // onBlur={formik.handleBlur}
                            // onChange={formik.handleChange}
                            // value={formik.values}
                            onChange={(e) => {
                              setSelectedItems(
                                selectedItems.map((i) => {
                                  if (
                                    i.stockItem.product.id === item.product.id
                                  ) {
                                    return {
                                      ...i,
                                      selectedQuantity: Number(e.target.value),
                                    };
                                  }
                                  return i;
                                })
                              );
                            }}
                            value={currentItem?.selectedQuantity}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </StateHandler>
          </TableContainer>
          <Pagination
            meta={meta}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Card>
        {/* <TextField
            error={
              formik.errors.quantity && formik.touched.quantity ? true : false
            }
            helperText={formik.touched.quantity && formik.errors.quantity}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.quantity}
            label="Quantity"
            type="number"
            name="quantity"
          /> */}
        {/* {!!(formik.touched.itemId && formik.errors.itemId) && (
            <Alert severity="error">
              <div>
                <Typography color="inherit" variant="subtitle2">
                  {formik.touched.itemId && formik.errors.itemId}
                </Typography>
              </div>
            </Alert>
          )} */}

        <Button
          variant="contained"
          onClick={() => {
            const invalid = selectedItems.some(
              (item) =>
                item.selectedQuantity <= 0 ||
                item.selectedQuantity > item.stockItem.quantity
            );
            if (!invalid) {
              selectedItems.forEach((item) => {
                handleAddItem(item.stockItem, item.selectedQuantity);
              });
              setOpen(false);
            }
          }}
          fullWidth={false}
        >
          Add Items
        </Button>
      </Stack>
      {/* </form> */}
    </Drawer>
  );
};

export default SaleTransactionItemsDrawer;
