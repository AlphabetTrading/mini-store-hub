import {
  RETAIL_SHOP_TOP_SELLING_PRODUCTS,
  RSTopSellingProductsData,
  RSTopSellingProductsVars,
} from "@/graphql/retail-shops/queries";
import { useQuery } from "@apollo/client";
import {
  Card,
  CardHeader,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Product } from "../../../types/product";
import StateHandler from "../state-handler";
import CustomChip from "../custom-chip";

type Props = {
  retailShopId: string;
};

const RetailShopTopSellingProducts = ({ retailShopId }: Props) => {
  const { data, loading, error } = useQuery<
    RSTopSellingProductsData,
    RSTopSellingProductsVars
  >(RETAIL_SHOP_TOP_SELLING_PRODUCTS, {
    variables: {
      retailShopId: retailShopId,
      paginationInput: {
        skip: 0,
        take: 5,
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Top Selling Products" />
      <StateHandler
        loading={loading}
        error={error}
        empty={data?.findProductsBySoldQuantityAndRetailShop.items.length == 0}
      >
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 600, minHeight: 100 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Items Sold</TableCell>
                <TableCell>Total Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.findProductsBySoldQuantityAndRetailShop.items?.map(
                (product: Product, index: number) => {
                  var quantity = 0;
                  var totalSale = 0;
                  product.saleTransactionItem?.forEach((saleTransaction) => {
                    quantity += saleTransaction.quantity;
                    totalSale += saleTransaction.subTotal ?? 0;
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
                      <TableCell>
                        <CustomChip label={product.category?.name || ""} />
                      </TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{totalSale}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StateHandler>
    </Card>
  );
};

export default RetailShopTopSellingProducts;
