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
import { Category } from "../../../types/categories";
import {
  DeleteCategoryData,
  DeleteCategoryVars,
  DELETE_CATEGORY,
  UpdateCategoryData,
  UpdateCategoryVars,
  UPDATE_CATEGORY,
} from "@/graphql/categories/mutations";
import dayjs from "dayjs";

type Props = {
  category: Category;
  handleItemToggle: (id: string) => void;
  selected: boolean;
};

interface Values {
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  parentId?: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Category Name is required"),
  description: Yup.string().required("Category Description is required"),
  amharicName: Yup.string()
    .min(1, "ስም ከአንድ በላይ ፊደል መሆን አለበት")
    .max(30, "ስም ከ30 ፊደል መብለጥ የለበትም"),
  amharicDescription: Yup.string()
    .min(5, "መግለጫ ከአምስት በላይ ፊደል መሆን አለበት")
    .max(100, "ስም ከ100 ፊደል መብለጥ የለበትም"),
});

const CategoriesListRow = ({ category, handleItemToggle, selected }: Props) => {
  const { data, loading, error } = useQuery<CategoryData>(CATEGORIES);
  const [
    deleteCategory,
    {
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useMutation<DeleteCategoryData, DeleteCategoryVars>(DELETE_CATEGORY);

  const [
    updateCategory,
    { loading: updateLoading, error: updateError, reset: updateReset },
  ] = useMutation<UpdateCategoryData, UpdateCategoryVars>(UPDATE_CATEGORY);

  const handleDeleteProduct = async () => {
    await deleteCategory({
      variables: {
        deleteCategoryId: category.id,
      },
      refetchQueries: [CATEGORIES],
      onCompleted: () => {
        handleItemToggle(category.id);
      },
    });
  };

  const initialValues: Values = {
    name: category.name,
    amharicName: category.amharicName,
    description: category.description,
    amharicDescription: category.amharicDescription,
    parentId: category.parentId,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values, formikHelpers) {
      updateCategory({
        variables: {
          updateCategoryId: category.id,
          data: {
            name: values.name,
            description: values.description,
            amharicName: values.amharicName,
            amharicDescription: values.amharicDescription,
          },
        },
        refetchQueries: [CATEGORIES],
        onCompleted: () => {
          formikHelpers.resetForm();
          handleItemToggle(category.id);
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
              handleItemToggle(category.id);
              updateReset();
              deleteReset();
            }}
          >
            {selected ? <ExpandMore /> : <ChevronRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{category.name}</TableCell>
        <TableCell align="left">{category.description}</TableCell>
        <TableCell align="left">
          {dayjs(category.createdAt).format("DD/MM/YYYY")}
        </TableCell>
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
                          // defaultValue={formik.values.name}
                          fullWidth
                          label="Category name"
                          name="name"
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
                          // defaultValue={formik.values.name}
                          fullWidth
                          label="ስም"
                          name="amharicName"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={
                            !!(
                              formik.touched.description &&
                              formik.errors.description
                            )
                          }
                          multiline
                          rows={4}
                          fullWidth
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          label="Category Description"
                          name="description"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.description}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          error={
                            !!(
                              formik.touched.amharicDescription &&
                              formik.errors.amharicDescription
                            )
                          }
                          multiline
                          rows={4}
                          fullWidth
                          helperText={
                            formik.touched.amharicDescription &&
                            formik.errors.amharicDescription
                          }
                          label="ዝርዝር መግለጫ"
                          name="amharicDescription"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.amharicDescription}
                        />
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
                      handleItemToggle(category.id);
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
                    Delete Category
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

export default CategoriesListRow;
