import { ApolloError, useLazyQuery } from "@apollo/client";
import { FormikHelpers, useFormik } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Category } from "../../../types/categories";
import * as Yup from "yup";
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  MenuItem,
  CardHeader,
  Button,
  Link,
  AlertTitle,
  Alert,
} from "@mui/material";
import { Unit } from "../../../types/product";
import BreadcrumbsSeparator from "../breadcrumbs-separator";
import FileDropZone from "../file-drop-zone";
import NextLink from "next/link";
import { CategoriesData, CATEGORIES } from "@/graphql/categories/queries";

type Props = {
  onSubmit: (
    values: ProductInputValues,
    formikHelpers: FormikHelpers<ProductInputValues>
  ) => void | Promise<any>;
  initialValues: ProductInputValues;
  loading: boolean;
  error: ApolloError | undefined;
  title: string;
  setPhoto: Dispatch<SetStateAction<any>>;
  photo: any;
};
export interface ProductInputValues {
  unit: Unit | null;
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  category: Category | null;
  photoUrl: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  amharicName: Yup.string(),
  unit: Yup.string().required("Unit is required"),
  // serialNumber: Yup.string().required("Serial number is required"),
  description: Yup.string().required("Description is required"),
  amharicDescription: Yup.string(),
  category: Yup.object().required("Category is required"),
  photoUrl: Yup.string(),
});

const ProductCreateEditForm = (props: Props) => {
  const { onSubmit, initialValues, loading, error, title, photo, setPhoto } =
    props;
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  console.log(error)
  console.log(initialValues);
  const [
    getCategories,
    {
      data: categoriesData,
      loading: categoriesLoading,
      error: categoriesError,
    },
  ] = useLazyQuery<CategoriesData>(CATEGORIES);
  const [options, setOptions] = useState<Category[]>([]);

  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  useEffect(() => {
    if (openAutocomplete) {
      (async () => {
        await getCategories({
          onCompleted: (data) => {
            console.log(data);
            setOptions(data.categories.items);
          },
          onError(error) {
            console.log(error);
          },
        });
      })();
    }
  }, [openAutocomplete]);
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4">{title} Product</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link component={NextLink} href={"/admin/dashboard"}>
                Dashboard
              </Link>
              <Link component={NextLink} href={"/admin/products"}>
                Products
              </Link>
              <Typography>{title}</Typography>
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
                        <TextField
                          error={
                            !!(
                              formik.touched.amharicName &&
                              formik.errors.amharicName
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.amharicName &&
                            formik.errors.amharicName
                          }
                          label="የዕቃ ስም"
                          name="amharicName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.amharicName}
                        />
                        <Autocomplete
                          fullWidth
                          open={openAutocomplete}
                          onOpen={() => {
                            setOpenAutocomplete(true);
                          }}
                          onClose={() => {
                            setOpenAutocomplete(false);
                          }}
                          value={formik.values.category}
                          onChange={(event: any, newValue: Category | null) => {
                            formik.setFieldValue("category", newValue);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          getOptionLabel={(option) => option.name}
                          options={options}
                          loading={categoriesLoading}
                          onBlur={formik.handleBlur}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={
                                formik.touched.category &&
                                formik.errors.category
                                  ? true
                                  : false
                              }
                              onChange={formik.handleChange}
                              helperText={
                                formik.touched.category &&
                                formik.errors.category
                              }
                              name="category"
                              label="Category"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {categoriesLoading ? (
                                      <CircularProgress
                                        sx={{ color: "neutral.500" }}
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                        />
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
                        <TextField
                          error={
                            !!(
                              formik.touched.amharicDescription &&
                              formik.errors.amharicDescription
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.amharicDescription &&
                            formik.errors.amharicDescription
                          }
                          label="መግለጫ"
                          name="amharicDescription"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.amharicDescription}
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

              <Card>
                <CardHeader title="Upload Photo" />
                <CardContent sx={{ pt: 0 }}>
                  <FileDropZone setFile={setPhoto} file={photo} />
                </CardContent>
              </Card>

              <Stack
                direction="row"
                alignContent="center"
                justifyContent="flex-end"
                spacing={1}
              >
                <Button color="inherit">Cancel</Button>
                <Button
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  {formik.isSubmitting && (
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
                  {title}
                </Button>
              </Stack>
              {error && (
                <Alert>
                  <AlertTitle>Error</AlertTitle>
                  {error?.message}
                </Alert>
              )}
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductCreateEditForm;
