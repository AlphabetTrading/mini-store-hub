import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  Input,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  PRODUCTS,
  ProductsData,
} from "@/graphql/products/queries";
import { Product, StockItem } from "../../../types/product";
import StateHandler from "../state-handler";
import { useEffect, useState } from "react";
import { SaleTransactionItem } from "../../../types/sale-transaction";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleAddItem:( (stockItem: StockItem ) => void) | ((stockItem: SaleTransactionItem ) => void);
  selectedStockItems: StockItem[] | SaleTransactionItem[];
};
interface Values {
  itemId: string;
  quantity: number;
}
const initialValues: Values = {
  itemId: "",
  quantity: 1,
};
const validationSchema = Yup.object({
  itemId: Yup.string().required("Item is required"),
  quantity: Yup.number()
    .min(1, "Quantity cannot be less than 1")
    .required("Quantity is required"),
});

export const AddIncomingItemModal = (props: Props) => {
  const [query, setQuery] = useState("");

  const { open, handleClose, handleAddItem, selectedStockItems } = props;
  const { data, loading, error, refetch } = useQuery<ProductsData>(PRODUCTS);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      const selectedProduct: Product = data?.products.items.find(
        (item) => item.id === values.itemId
      ) as Product;
      handleAddItem({ product: selectedProduct, quantity: values.quantity });
      handleClose();
      helpers.resetForm();
    },
  });
  const existingProductIds = selectedStockItems.map(
    (selected) => selected.product.id
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch({
        filterProductInput: {
          name: {
            contains: query,
          },
          // serialNumber: {
          //   contains: query,
          // },
        },
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, refetch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={12}
          sx={{
            position: "absolute" as "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: 520,
            maxHeight: 600,
            m: "auto",
          }}
        >
          <Stack spacing={2} sx={{ p: 8 }}>
            <Card>
              <Stack
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
                direction="row"
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
                <Input
                  disableUnderline
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  placeholder="Search by product name"
                />
              </Stack>
              <Divider />
              <StateHandler
                loading={loading}
                error={error}
                empty={data?.products.items.length === 0}
              >
                <RadioGroup
                  name="itemId"
                  sx={{ maxHeight: 300, display: "block", overflow: "auto" }}
                  value={formik.values.itemId.toString()}
                  onChange={(event) => {
                    formik.setFieldValue("itemId", event.currentTarget.value);
                  }}
                >
                  {data?.products.items
                    .filter(
                      (product) => !existingProductIds.includes(product.id)
                    )
                    .map((item, idx) => {
                      const isDisabled = false;
                      return (
                        <Paper
                          key={idx}
                          sx={{
                            alignItems: "flex-start",
                            display: "flex",
                            px: 2,
                            py: 0.5,
                          }}
                          variant="outlined"
                        >
                          <FormControlLabel
                            control={<Radio />}
                            disabled={isDisabled}
                            label={
                              <Box sx={{ ml: 2 }}>
                                <Typography
                                  sx={{
                                    color: isDisabled
                                      ? "action.disabled"
                                      : "text.primary",
                                  }}
                                  variant="subtitle2"
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: isDisabled
                                      ? "action.disabled"
                                      : "text.secondary",
                                  }}
                                  variant="body2"
                                >
                                  {item.serialNumber}
                                </Typography>
                              </Box>
                            }
                            value={item.id}
                          />
                        </Paper>
                      );
                    })}
                </RadioGroup>
              </StateHandler>
            </Card>

            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              helperText={formik.touched.quantity && formik.errors.quantity}
              error={
                formik.touched.quantity && formik.errors.quantity ? true : false
              }
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Stack>
        </Paper>
      </form>
      {/* </Box> */}
    </Modal>
  );
};
