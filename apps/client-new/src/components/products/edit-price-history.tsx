"use client";
import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  Link,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  CardHeader,
} from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { PRODUCT, ProductData, ProductVars } from "@/graphql/products/queries";
import { AddProductPriceModal } from "@/components/modals/add-product-price-modal";
import StateHandler from "@/components/state-handler";
import PriceHistoryListRow from "@/components/products/price-history-list-row";
import { PriceHistory } from "../../../types/product";

type Props = {
  productId: string;
};
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

const EditPriceHistory = ({ productId }: Props) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {},
  });

  const [open, setOpen] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery<ProductData, ProductVars>(PRODUCT, {
    variables: {
      productId: productId,
    },
    fetchPolicy: "cache-and-network",
  });

  const handlePriceToggle = (id: string) => {
    setSelectedPrice((prev) => {
      if (prev === id) {
        return null;
      }
      return id;
    });
  };

  return (
    <>
      <AddProductPriceModal
        productId={productId}
        open={open}
        handleClose={() => setOpen(false)}
      />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="xl">
          {productLoading && <CircularProgress />}
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row"
                    >
                      <Typography variant="h6">Price History</Typography>
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        variant="contained"
                      >
                        Add price
                      </Button>
                    </Stack>
                    <StateHandler
                      empty={productData?.product.priceHistory.length === 0}
                      error={productError}
                      loading={productLoading}
                    >
                      <Grid container spacing={2}>
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
                                <TableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {productData?.product?.priceHistory?.map(
                                (history: PriceHistory, idx: number) => (
                                  <PriceHistoryListRow
                                    key={idx}
                                    activePriceId={
                                      productData?.product?.activePrice?.id
                                    }
                                    productId={productData?.product?.id}
                                    priceHistory={history}
                                  />
                                )
                              )}
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </StateHandler>
                  </Stack>
                </CardContent>
              </Card>
              <Stack
                direction="row"
                alignContent="center"
                justifyContent="flex-end"
                spacing={1}
              >
                {/* <Button color="inherit">Cancel</Button>
                  <Button type="submit" variant="contained">
                    Update
                  </Button> */}
              </Stack>
            </Stack>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default EditPriceHistory;
