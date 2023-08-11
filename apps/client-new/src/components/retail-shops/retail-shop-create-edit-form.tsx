import React from "react";
import { User } from "../../../types/user";
import {
  Box,
  Link,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import NextLink from "next/link";
import BreadcrumbsSeparator from "../breadcrumbs-separator";
import { FormikHelpers, useFormik } from "formik";
import { ApolloError, useQuery } from "@apollo/client";
import {
  RETAIL_SHOP_MANAGERS,
  RetailShopManagersData,
} from "@/graphql/retail-shop-managers/queries";
import * as Yup from "yup";
import StateHandler from "../state-handler";
import { useRouter } from "next/navigation";
type Props = {
  initialValues: RetailShopInputValues;
  onSubmit: (
    values: RetailShopInputValues,
    formikHelpers: FormikHelpers<RetailShopInputValues>
  ) => void | Promise<any>;
  loading: boolean;
  error: ApolloError | undefined;
  title: string;
};

export interface RetailShopInputValues {
  name: string;
  formattedAddress: string;
  city: string;
  street: string;
  lat: number;
  lng: number;
  retailShopManager: User | null;
}
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  formattedAddress: Yup.string(),
  city: Yup.string(),
  street: Yup.string(),
  lat: Yup.number(),
  lng: Yup.number(),
});

const RetailShopCreateEditForm = (props: Props) => {
  const { initialValues, onSubmit, loading, error, title } = props;
  const {
    data,
    error: managersError,
    loading: managersLoading,
  } = useQuery<RetailShopManagersData>(RETAIL_SHOP_MANAGERS);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const router = useRouter();
  return (
    <Box component="main" sx={{ py: 8 }}>
      <StateHandler
        loading={managersLoading}
        error={managersError}
        empty={false}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">{title} Retail Shop</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/retail-shops"}>
                  Retail Shops
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
                            error={
                              !!(formik.touched.name && formik.errors.name)
                            }
                            fullWidth
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
                            label="Retail Shop Name"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <Autocomplete
                            value={formik.values.retailShopManager}
                            onChange={(event: any, newValue: User | null) => {
                              formik.setFieldValue(
                                "retailShopManager",
                                newValue
                              );
                            }}
                            getOptionLabel={(option) => option.firstName}
                            options={data?.retailShopManagers || []}
                            sx={{ width: 300 }}
                            renderInput={(params: any) => (
                              <TextField
                                {...params}
                                error={
                                  formik.touched.retailShopManager &&
                                  formik.errors.retailShopManager
                                    ? true
                                    : false
                                }
                                helperText={
                                  formik.touched.retailShopManager &&
                                  formik.errors.retailShopManager
                                }
                                name="retailShopManager"
                                label="Retail Shop Manager"
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
                            error={
                              !!(formik.touched.city && formik.errors.city)
                            }
                            fullWidth
                            helperText={
                              formik.touched.city && formik.errors.city
                            }
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
                    {title} Retail Shop
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
      </StateHandler>
    </Box>
  );
};

export default RetailShopCreateEditForm;
