import {
  ItemsData,
  ITEMS,
  WAREHOUSE_ITEMS,
  WarehouseItemsData,
  WarehouseItemsVars,
} from "@/graphql/items/queries";
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
import * as Yup from "yup";
import { Item, WarehouseStock } from "../../../types/item";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddItem: (item: WarehouseStock, quantity: number) => void;
};
interface Values {
  quantity: number;
  itemId: string;
}
const initialValues: Values = {
  quantity: 1,
  itemId: "",
};

const TransferItemsDrawer = ({ open, setOpen, handleAddItem }: Props) => {
  const generateValidationSchema = (values: Values) => {
    const maxQuantity = itemsData?.warehouseStockByWarehouseId.find(
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
  } = useQuery<WarehouseItemsData, WarehouseItemsVars>(WAREHOUSE_ITEMS, {
    variables: {
      warehouseId: "clki1bbrx000srlwgvx7jzw1i",
    },
  });

  const formik = useFormik({
    initialValues,
    validate(values) {
      return generateValidationSchema(values);
    },
    onSubmit: (values, helpers) => {
      const item: WarehouseStock = itemsData?.warehouseStockByWarehouseId.find(
        (i) => i.product.id === values.itemId
      ) as WarehouseStock;

      handleAddItem(item, values.quantity);
      setOpen(false);
      helpers.resetForm();
    },
  });

  console.log(formik.errors);

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
              spacing={3}
              value={formik.values.itemId.toString()}
              onChange={(event) => {
                formik.setFieldValue("itemId", event.currentTarget.value);
              }}
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
                itemsData?.warehouseStockByWarehouseId?.map((item, idx) => (
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
                          <Typography variant="subtitle2">
                            {item.product.name}
                          </Typography>
                          <Typography variant="subtitle2">
                            {item.quantity}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            {item.product.serialNumber}
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
          {JSON.stringify(formik.errors.quantity, null, 2)}
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
            {!!(formik.touched.itemId && formik.errors.itemId)&& <Alert severity="error">
            <div>
              <Typography color="inherit" variant="subtitle2">
                {formik.touched.itemId && formik.errors.itemId}
              </Typography>
            </div>
          </Alert>}
           
          <Button variant="contained" type="submit" fullWidth={false}>
            Add Item
          </Button>
        </Stack>
      </form>
    </Drawer>
  );
};

export default TransferItemsDrawer;