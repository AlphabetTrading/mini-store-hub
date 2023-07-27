"use client";
import loading from "@/app/loading";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import { CATEGORIES, CategoryData } from "@/graphql/categories/queries";
import { useQuery } from "@apollo/client";
import Edit from "@mui/icons-material/Edit";
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
  CircularProgress,
  MenuItem,
  Button,
  Link,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ItemsData, ItemsVars } from "@/graphql/items/queries";
import dayjs from "dayjs";

type Props = {};
interface Values {
  unit: string;
  serialNumber: string;
  name: string;
  description: string;
  category: string;
}
const initialValues: Values = {
  unit: "",
  serialNumber: "",
  name: "",
  description: "",
  category: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  unit: Yup.string().required("Unit is required"),
  serialNumber: Yup.string().required("Serial number is required"),
  description: Yup.string().required("Description is required"),
  categoryId: Yup.string().required("Category is required"),
});

const page = (props: Props) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {},
  });
  const { data, loading, error } = useQuery<CategoryData>(CATEGORIES);
  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError,
  } = useQuery<ItemsData, ItemsVars>(CATEGORIES);

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handlePriceToggle = (id: string) => {
    setSelectedPrice((prev) => {
      if (prev === id) {
        return null;
      }
      return id;
    });
  };

  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4">Create Item</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link component={NextLink} href={"/dashboard"}>
                Dashboard
              </Link>
              <Link component={NextLink} href={"/items"}>
                Items
              </Link>
              <Typography>Edit</Typography>
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
                        {/* {loading ? <CircularProgress /> : null} */}
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
                          value={formik.values.name}
                          select
                        >
                          {data?.categories.items.map((option: any) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
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
                        error={!!(formik.touched.name && formik.errors.name)}
                        fullWidth
                        helperText={formik.touched.name && formik.errors.name}
                        label="Unit"
                        name="unit"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="flex-end">
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      
                    >
                      Add price
                    </Button>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6">Pricing details</Typography>
                      </Grid>

                      <Grid xs={12} md={9}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell />
                              <TableCell align="left">Date</TableCell>
                              <TableCell align="left">
                                Purchased Price Per Unit
                              </TableCell>
                              <TableCell align="left">
                                Selling Price Per Unit
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {itemsData?.products.items[0].priceHisotry.map(
                              (history, idx) => {
                                return (
                                  <TableRow key={idx}>
                                    <TableCell>
                                      <IconButton
                                        onClick={() =>
                                          handlePriceToggle(history.id)
                                        }
                                      >
                                        {selectedPrice ? (
                                          <ExpandMore />
                                        ) : (
                                          <ChevronRightIcon />
                                        )}
                                      </IconButton>
                                    </TableCell>
                                    <TableCell>{dayjs(history.createdAt).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell>
                                      {history.purchasedPrice}
                                    </TableCell>
                                    <TableCell>{history.price}</TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>

              <Stack
                direction="row"
                alignContent="center"
                justifyContent="flex-end"
                spacing={1}
              >
                <Button color="inherit">Cancel</Button>
                <Button type="submit" variant="contained">
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

export default page;