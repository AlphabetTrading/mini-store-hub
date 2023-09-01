import {
  WAREHOUSE_STOCK,
  WarehouseStockData,
  WarehouseStockVars,
} from "@/graphql/products/queries";
import { useQuery } from "@apollo/client";
import {
  Drawer,
  Stack,
  Typography,
  Card,
  RadioGroup,
  Paper,
  FormControlLabel,
  Radio,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Product, StockItem } from "../../../types/product";
import { useSession } from "next-auth/react";
import { SelectedWarehouseItem } from "@/app/(warehouse-manager)/transfer-items/page";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddItem: (item: StockItem, quantity: number) => void;
  selectedItemsId: string[];
};
interface Values {
  quantity: number;
  itemId: string;
}
const initialValues: Values = {
  quantity: 1,
  itemId: "",
};

const TransferItemsDrawer = ({
  open,
  setOpen,
  handleAddItem,
  selectedItemsId,
}: Props) => {
  const { data: sessionData } = useSession();

  const generateValidationSchema = (values: Values) => {
    const maxQuantity = itemsData?.warehouseStocks.items.find(
      (item) => item.product.id === values.itemId
    )?.quantity as number;
    let errors: any = {};
    if (!values.itemId) {
      errors.itemId = "Item is required";
    }
    if (values.quantity < 1) {
      errors.quantity = "Quantity cannot be less than 1";
    } else if (values.quantity > maxQuantity) {
      errors.quantity = `Quantity cannot be more than ${maxQuantity}`;
    }
    return errors;
  };
  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError,
  } = useQuery<WarehouseStockData, WarehouseStockVars>(WAREHOUSE_STOCK, {
    variables: {
      filterWarehouseStockInput: {
        warehouse: {
          id: (sessionData?.user as any).warehouseId || "",
        },
      },
    },
  });

  const formik = useFormik({
    initialValues,
    validate(values) {
      return generateValidationSchema(values);
    },
    onSubmit: (values, helpers) => {
      const item: StockItem = itemsData?.warehouseStocks.items.find(
        (i) => i.product.id === values.itemId
      ) as StockItem;

      handleAddItem(item, values.quantity);
      setOpen(false);
      helpers.resetForm();
    },
  });

  return (
    <Drawer
      anchor="right"
      onClose={() => setOpen(false)}
      open={open}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 500,
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack sx={{ px: 4, py: 8 }} spacing={2}>
          <Typography variant="h6">Add Item</Typography>
          <Card sx={{ p: 4 }}>
            <Stack
              component={RadioGroup}
              spacing={1}
              value={formik.values.itemId.toString()}
              onChange={(event) => {
                formik.setFieldValue("itemId", event.currentTarget.value);
              }}
              sx={{ maxHeight: 350, display: "block", overflow: "auto", pl: 1 }}
            >
              {itemsLoading ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ pb: 4, pt: 2 }}
                >
                  <CircularProgress />
                </Box>
              ) : !itemsData || itemsError ? (
                <Alert severity="error">
                  <div>
                    <Typography color="inherit" variant="subtitle2">
                      {itemsError?.message}
                    </Typography>
                  </div>
                </Alert>
              ) : (
                itemsData?.warehouseStocks.items
                  ?.filter((item) => !selectedItemsId.includes(item.product.id))
                  .map((item, idx) => (
                    <Paper
                      key={idx}
                      sx={{
                        alignItems: "flex-start",
                        display: "flex",
                        px: 2,
                        py: 1,
                      }}
                      variant="outlined"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        key={idx}
                        label={
                          <Box sx={{ ml: 2 }}>
                            <Stack direction="row" gap={1}>
                              <Typography variant="subtitle2">
                                {item.product.name}
                              </Typography>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                {`(${item.product.serialNumber})`}
                              </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="body2">
                              {`Quantity: ${item.quantity}`}
                            </Typography>
                          </Box>
                        }
                        value={item.product.id}
                      />
                    </Paper>
                  ))
              )}
            </Stack>
          </Card>
          <TextField
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
          />
          {!!(formik.touched.itemId && formik.errors.itemId) && (
            <Alert severity="error">
              <div>
                <Typography color="inherit" variant="subtitle2">
                  {formik.touched.itemId && formik.errors.itemId}
                </Typography>
              </div>
            </Alert>
          )}

          <Button variant="contained" type="submit" fullWidth={false}>
            Add Item
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default TransferItemsDrawer;
