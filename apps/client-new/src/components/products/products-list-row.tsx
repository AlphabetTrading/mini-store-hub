import {
  Alert,
  AlertTitle,
  Button,
  CardContent,
  CircularProgress,
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
import { Product } from "../../../types/product";
import { CATEGORIES, CategoryData } from "@/graphql/categories/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PRODUCT,
  DeleteProductData,
  DeleteProductVars,
  UPDATE_PRODUCT,
  UpdateProductData,
  UpdateProductVars,
} from "@/graphql/products/mutations";
import { useFormik } from "formik";
import { PRODUCTS } from "@/graphql/products/queries";
import * as Yup from "yup";
<<<<<<< Updated upstream
import CustomChip from "../custom-chip";
=======
import { showAlert } from "@/helpers/showAlert";
>>>>>>> Stashed changes

type Props = {
  product: Product;
  handleItemToggle: (id: string) => void;
  selected: boolean;
};

interface Values {
  unit: string;
  serialNumber: string;
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  category: string;
}
const initialValues: Values = {
  unit: "",
  serialNumber: "",
  name: "",
  amharicName: "",
  description: "",
  amharicDescription: "",
  category: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  amharicName: Yup.string(),
  unit: Yup.string().required("Unit is required"),
  serialNumber: Yup.string().required("Serial number is required"),
  description: Yup.string().required("Description is required"),
  amharicDescription: Yup.string(),
  category: Yup.string().required("Category is required"),
});

const ProductsListRow = ({ product, handleItemToggle, selected }: Props) => {
  const { data, loading, error } = useQuery<CategoryData>(CATEGORIES);
  const [
    updateProduct,
    { loading: updateLoading, error: updateError, reset: updateReset },
  ] = useMutation<UpdateProductData, UpdateProductVars>(UPDATE_PRODUCT);
  const [
    deleteProduct,
    { loading: deleteLoading, error: deleteError, reset: deleteReset },
  ] = useMutation<DeleteProductData, DeleteProductVars>(DELETE_PRODUCT);
  const handleDeleteProduct = async () => {
    await deleteProduct({
      variables: {
        deleteProductId: product.id,
      },
      refetchQueries: [PRODUCTS],
      onCompleted: () => {
        showAlert("removed a", "product");
        handleItemToggle(product.id);
      },
    });
  };
  const initialValues: Values = {
    unit: product.unit,
    serialNumber: product.serialNumber,
    name: product.name,
    amharicName: product.amharicName,
    description: product.description,
    amharicDescription: product.amharicDescription,
    category: product.category.id,
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values, formikHelpers) {
      updateProduct({
        variables: {
          updateProductId: product.id,
          data: {
            categoryId: values.category,
            name: values.name,
            amharicName: values.amharicName,
            description: values.description,
            amharicDescription: values.amharicDescription,
            unit: values.unit,
          },
        },
        refetchQueries: [PRODUCTS],
        onCompleted: () => {
          formikHelpers.resetForm();
          showAlert("edited a", "product");
          handleItemToggle(product.id);
        },
      });
    },
  });
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() => {
              handleItemToggle(product.id);
              updateReset();
              deleteReset();
            }}
          >
            {selected ? <ExpandMore /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{product.name}</TableCell>
        <TableCell align="left">{product.serialNumber}</TableCell>
        <TableCell align="left">
          <CustomChip label={product.category.name} />
        </TableCell>
        <TableCell align="left">
          <CustomChip label={product.unit} status="neutral" />
        </TableCell>
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
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={8} xs={12}>
                    <Typography variant="h6">Basic details</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          helperText={formik.touched.name && formik.errors.name}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          defaultValue={product.name}
                          fullWidth
                          label="Product name"
                          name="name"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.serialNumber}
                          helperText={
                            formik.touched.serialNumber &&
                            formik.errors.serialNumber
                          }
                          error={
                            formik.touched.serialNumber &&
                            Boolean(formik.errors.serialNumber)
                          }
                          defaultValue={product.serialNumber}
                          disabled
                          fullWidth
                          label="Serial number"
                          name="serialNumber"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.amharicName}
                          helperText={
                            formik.touched.amharicName &&
                            formik.errors.amharicName
                          }
                          error={
                            formik.touched.amharicName &&
                            Boolean(formik.errors.amharicName)
                          }
                          defaultValue={product.amharicName}
                          fullWidth
                          label="ስም"
                          name="amharicName"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.category}
                          helperText={
                            formik.touched.category && formik.errors.category
                          }
                          error={
                            formik.touched.category &&
                            Boolean(formik.errors.category)
                          }
                          defaultValue={product.category}
                          fullWidth
                          label="Category"
                          select
                          name="category"
                        >
                          {data?.categories.items.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                          }
                          defaultValue={product.description}
                          fullWidth
                          multiline
                          rows={4}
                          label="Description"
                          name="description"
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.amharicDescription}
                          helperText={
                            formik.touched.amharicDescription &&
                            formik.errors.amharicDescription
                          }
                          error={
                            formik.touched.amharicDescription &&
                            Boolean(formik.errors.amharicDescription)
                          }
                          defaultValue={product.amharicDescription}
                          fullWidth
                          multiline
                          rows={4}
                          label="ዝርዝር መግለጫ"
                          name="amharicDescription"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Typography variant="h6">Pricing and Details</Typography>
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
                          variant="outlined"
                          component={NextLink}
                          href={`/admin/products/edit/${product.id}`}
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
                  <Button
                    onClick={() => {}}
                    type="submit"
                    variant="contained"
                    disabled={updateLoading}
                  >
                    {updateLoading && (
                      <CircularProgress
                        sx={{
                          color: "neutral.400",
                          // display: loading ? "block" : "none",
                          width: "25px !important",
                          height: "25px !important",
                          mr: 1,
                        }}
                      />
                    )}
                    Update
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => {
                      handleItemToggle(product.id);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
                <div>
                  <Button
                    disabled={deleteLoading}
                    onClick={() => {
                      handleDeleteProduct();
                    }}
                    color="error"
                  >
                    {deleteLoading && (
                      <CircularProgress
                        sx={{
                          color: "neutral.400",
                          // display: loading ? "block" : "none",
                          width: "25px !important",
                          height: "25px !important",
                          mr: 1,
                        }}
                      />
                    )}
                    Delete product
                  </Button>
                </div>
              </Stack>
              {(deleteError || updateError) && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {deleteError?.message || updateError?.message}
                </Alert>
              )}
            </form>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ProductsListRow;
