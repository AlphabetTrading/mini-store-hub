"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CATEGORIES, CategoryData } from "@/graphql/categories/queries";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { API_URL } from "@/constants/urls";
import {
  CREATE_PRODUCT,
  CreateProductData,
  CreateProductVars,
} from "@/graphql/products/mutations";
import { useMutation } from "@apollo/client";
import { PRODUCTS } from "@/graphql/products/queries";
import { useRouter } from "next/navigation";
import { Unit } from "../../../../../types/product";
import { showAlert } from "@/helpers/showAlert";

type Props = {};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  amharicName: Yup.string(),
  unit: Yup.string().required("Unit is required"),
  // serialNumber: Yup.string().required("Serial number is required"),
  description: Yup.string().required("Description is required"),
  amharicDescription: Yup.string(),
  category: Yup.string().required("Category is required"),
});

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

const Page = (props: Props) => {
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<CategoryData>(CATEGORIES);

  const [createProduct, { data, loading, error }] = useMutation<
    CreateProductData,
    CreateProductVars
  >(CREATE_PRODUCT);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      await createProduct({
        variables: {
          data: {
            name: values.name,
            // amharicName: values.amharicName,
            categoryId: values.category,
            description: values.description,
            // amharicDescription: values.amharicDescription,
            unit: values.unit,
          },
        },
        refetchQueries: [{ query: PRODUCTS }],
        // awaitRefetchQueries: true,
        onCompleted: () => {
          helpers.resetForm();
          showAlert("added a", "product");
          router.push("/admin/products");
        },
      });
    },
  });
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4">Create Product</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link component={NextLink} href={"/admin/dashboard"}>
                Dashboard
              </Link>
              <Link component={NextLink} href={"/admin/products"}>
                Products
              </Link>
              <Typography>Create</Typography>
            </Breadcrumbs>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6">Basic details</Typography>
                    </Grid>

                    <Grid xs={12} md={8}>
                      <Stack spacing={3}>
                        <TextField
                          error={!!(formik.touched.name && formik.errors.name)}
                          fullWidth
                          helperText={formik.touched.name && formik.errors.name}
                          label="Product Name"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                        {categoryLoading ? <CircularProgress /> : null}
                        <TextField
                          error={
                            !!(
                              formik.touched.category && formik.errors.category
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.category && formik.errors.category
                          }
                          label="Category"
                          name="category"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.category}
                          select
                        >
                          {categoryData?.categories.items.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>

                        {/* <TextField
                          error={
                            !!(
                              formik.touched.serialNumber &&
                              formik.errors.serialNumber
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.serialNumber &&
                            formik.errors.serialNumber
                          }
                          label="Serial Number"
                          name="serialNumber"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.serialNumber}
                        /> */}
                        <TextField
                          error={
                            !!(
                              formik.touched.description &&
                              formik.errors.description
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          label="Description"
                          name="description"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          multiline
                          rows={4}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6">Measurement details</Typography>
                    </Grid>

                    <Grid xs={12} md={8}>
                      <TextField
                        error={!!(formik.touched.unit && formik.errors.unit)}
                        fullWidth
                        helperText={formik.touched.unit && formik.errors.unit}
                        label="Unit"
                        name="unit"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.unit}
                        select
                      >
                        {Object.values(Unit).map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Stack
                direction="row"
                alignContent="center"
                justifyContent="flex-end"
                spacing={1}
              >
                <Button color="inherit">Cancel</Button>
                <Button disabled={loading} type="submit" variant="contained">
                  {loading && (
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
                  Create
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
