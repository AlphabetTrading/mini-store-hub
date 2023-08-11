"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { ApolloError, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  WAREHOUSE_MANAGERS,
  WarehouseManagersData,
} from "@/graphql/users/queries";
import { User } from "../../../types/user";

type Props = {
  onSubmit: (
    values: WarehouseInputValues,
    formikHelpers: FormikHelpers<WarehouseInputValues>
  ) => void | Promise<any>;
  initialValues: WarehouseInputValues;
  loading: boolean;
  error: ApolloError | undefined;
  title: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  formattedAddress: Yup.string(),
  city: Yup.string(),
  street: Yup.string(),
  lat: Yup.number(),
  lng: Yup.number(),
});

export interface WarehouseInputValues {
  name: string;
  formattedAddress: string;
  city: string;
  street: string;
  lat: number;
  lng: number;
  warehouseManager: User | null;
}

const WarehouseCreateEditForm = (props: Props) => {
  const { onSubmit, initialValues, loading, error, title } = props;
  const router = useRouter();
  const { data } = useQuery<WarehouseManagersData>(WAREHOUSE_MANAGERS);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4">{title} Warehouse</Typography>
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
                          label="Warehouse Name"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                        <Autocomplete
                          value={formik.values.warehouseManager}
                          onChange={(event: any, newValue: User | null) => {
                            formik.setFieldValue("warehouseManager", newValue);
                          }}
                          getOptionLabel={(option) => option.firstName}
                          options={data?.warehouseManagers || []}
                          sx={{ width: 300 }}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              error={
                                formik.touched.warehouseManager &&
                                formik.errors.warehouseManager
                                  ? true
                                  : false
                              }
                              helperText={
                                formik.touched.warehouseManager &&
                                formik.errors.warehouseManager
                              }
                              name="warehouseManager"
                              label="Warehouse Manager"
                              fullWidth
                            />
                          )}
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
                      <Typography variant="h6">Location details</Typography>
                    </Grid>

                    <Grid xs={12} md={8} spacing={2}>
                      <Stack spacing={3}>
                        <TextField
                          error={!!(formik.touched.city && formik.errors.city)}
                          fullWidth
                          helperText={formik.touched.city && formik.errors.city}
                          label="City"
                          name="city"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.city}
                        />

                        <TextField
                          error={
                            !!(formik.touched.street && formik.errors.street)
                          }
                          fullWidth
                          helperText={
                            formik.touched.street && formik.errors.street
                          }
                          label="Street"
                          name="street"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.street}
                        />

                        <TextField
                          error={
                            !!(
                              formik.touched.formattedAddress &&
                              formik.errors.formattedAddress
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.formattedAddress &&
                            formik.errors.formattedAddress
                          }
                          label="Address description"
                          name="formattedAddress"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.formattedAddress}
                        />
                        <TextField
                          error={!!(formik.touched.lat && formik.errors.lat)}
                          fullWidth
                          helperText={formik.touched.lat && formik.errors.lat}
                          label="Latitude"
                          name="lat"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.lat}
                          type="number"
                        />
                        <TextField
                          error={!!(formik.touched.lng && formik.errors.lng)}
                          fullWidth
                          helperText={formik.touched.lng && formik.errors.lng}
                          label="Longitude"
                          name="lng"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.lng}
                          type="number"
                        />
                      </Stack>
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
                <Button
                  color="inherit"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Cancel
                </Button>
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
                  {title}
                </Button>
              </Stack>
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error.message}
                </Alert>
              )}
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default WarehouseCreateEditForm;
