import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  Card,
  CardHeader,
  CircularProgress,
  TableContainer,
} from "@mui/material";
import React from "react";
import { Product } from "../../../types/product";
import {
  TopSellingProductsData,
  TopSellingProductsVars,
  GET_ADMIN_DASHBOARD_TOP_SELLING_PRODUCTS,
} from "@/graphql/admin/queries";
import { useQuery } from "@apollo/client";

type Props = {};

const TopSellingProducts = (props: Props) => {
  const { data, loading, error } = useQuery<
    TopSellingProductsData,
    TopSellingProductsVars
  >(GET_ADMIN_DASHBOARD_TOP_SELLING_PRODUCTS, {
    variables: {
      paginationInput: {
        take: 6,
        skip: 0,
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Top Selling Products" />
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Items Sold</TableCell>
              <TableCell>Total Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <Stack
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Stack>
            ) : (
              data?.findProductsByTopSell.items?.map(
                (product: Product, index: number) => {
                  var quantity = 0;
                  var totalSale = 0;
                  product.saleTransactionItem?.forEach((saleTransaction) => {
                    quantity += saleTransaction.quantity;
                    totalSale += saleTransaction.subTotal;
                  });
                  return (
                    <TableRow key={index}>
                      <TableCell width="25%">
                        <Stack>
                          <Typography variant="subtitle2" color="text.primary">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Serial Number: #{product.serialNumber}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{product.category?.name}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{totalSale}</TableCell>
                    </TableRow>
                  );
                }
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TopSellingProducts;
