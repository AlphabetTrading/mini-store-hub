import {
  RETAIL_SHOP_LOW_STOCK_PRODUCTS,
  RSLowStockProductsData,
  RSLowStockProductsVars,
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
import { Product, StockItem } from "../../../types/product";
import CustomChip from "../custom-chip";
import StateHandler from "../state-handler";

type Props = {
  retailShopId: string;
};

const RetailShopLowStock = (props: Props) => {
  const { data, loading, error } = useQuery<
    RSLowStockProductsData,
    RSLowStockProductsVars
  >(RETAIL_SHOP_LOW_STOCK_PRODUCTS, {
    variables: {
      retailShopId: props.retailShopId,
      paginationInput: {
        skip: 0,
        take: 5,
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Low Stock Products" />
      <StateHandler
        loading={loading}
        error={error}
        empty={data?.findLowStockByRetailShopId.items.length == 0}
      >
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 600, minHeight: 100 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.findLowStockByRetailShopId.items?.map(
                (stockItem: StockItem, index: number) => {
                    const {product,quantity} = stockItem;
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

export default RetailShopLowStock;
