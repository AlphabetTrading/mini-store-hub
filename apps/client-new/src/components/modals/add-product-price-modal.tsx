import {
  Button,
  CircularProgress,
  Modal,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  ADD_PRICE_HISTORY,
  AddPriceHistoryData,
  AddPriceHistoryVars,
} from "@/graphql/products/mutations";
import { on } from "events";
import { PRODUCT } from "@/graphql/products/queries";

type Props = {
  open: boolean;
  handleClose: () => void;
  productId: string;
};
interface Values {
  price: number;
  purchasedPrice: number;
}
const initialValues: Values = {
  purchasedPrice: 0,
  price: 0,
};
const validationSchema = Yup.object({
  purchasedPrice: Yup.number()
    .min(0.1, "Purchased price cannot be less than 0")
    .required("Purchased price is required"),
  price: Yup.number()
    .min(0.1, "Price cannot be less than 0")
    .required("Price is required"),
});

export const AddProductPriceModal = (props: Props) => {
  const { open, handleClose, productId } = props;
  const [addPriceHistory, { data, loading, error }] = useMutation<
    AddPriceHistoryData,
    AddPriceHistoryVars
  >(ADD_PRICE_HISTORY);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      await addPriceHistory({
        variables: {
          priceHistory: {
            price: values.price,
            purchasedPrice: values.purchasedPrice,
            productId: productId,
          },
        },
        onCompleted: (data) => {
          handleClose();
          helpers.resetForm();
        },
        refetchQueries: [PRODUCT],
      });
    },
  });

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
            <TextField
              label="Purchased Price"
              type="number"
              name="purchasedPrice"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.purchasedPrice}
              helperText={
                formik.touched.purchasedPrice && formik.errors.purchasedPrice
              }
              error={
                formik.touched.purchasedPrice && formik.errors.purchasedPrice
                  ? true
                  : false
              }
            />
            <TextField
              label="Selling Price"
              type="number"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && formik.errors.price ? true : false}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading && (
                <CircularProgress
                  sx={{
                    color: "neutral.400",
                    width: "25px !important",
                    height: "25px !important",
                    mr: 1,
                  }}
                />
              )}
              Add new price
            </Button>
          </Stack>
        </Paper>
      </form>
      {/* </Box> */}
    </Modal>
  );
};
