import React from "react";
import {
  SaleTransaction,
  SaleTransactionItem,
} from "../../../types/saleTransaction";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowBack, ImageOutlined } from "@mui/icons-material";
import CustomChip from "../custom-chip";

type Props = {
  saleTransaction: SaleTransaction;
  closeDetail: () => void;
};

const RetailShopSaleDetail = ({ saleTransaction, closeDetail }: Props) => {
  return (
    <div>
      <IconButton onClick={closeDetail}>
        <SvgIcon sx={{ mr: 1 }}>
          <ArrowBack />
        </SvgIcon>
      </IconButton>
      <Card>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              "&:first-of-type": {
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <Typography align="center" variant="h5">
              {saleTransaction.totalPrice}
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              component="h4"
              variant="overline"
            >
              Total Sale
            </Typography>
          </Box>
          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              "&:first-of-type": {
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <Typography align="center" variant="h5">
              {saleTransaction.saleTransactionItems.length}
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              component="h4"
              variant="overline"
            >
              Total Items
            </Typography>
          </Box>
        </Box>
        <Divider /> 
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saleTransaction.saleTransactionItems.map((saleTransactionItem,idx) => {
              const { product, subTotal, quantity } = saleTransactionItem;
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      <>
                        {product.images.length > 0 ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              backgroundImage: `url("${product.images[0]}")`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: 1,
                              display: "flex",
                              height: 70,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 70,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              borderRadius: 1,
                              display: "flex",
                              height: 70,
                              justifyContent: "center",
                              width: 70,
                            }}
                          >
                            <SvgIcon>
                              <ImageOutlined />
                            </SvgIcon>
                          </Box>
                        )}
                      </>
                      <Box
                        sx={{
                          cursor: "pointer",
                          ml: 2,
                        }}
                      >
                        <Typography variant="subtitle2">
                          {product.name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {product.serialNumber}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <CustomChip label={product.unit || ""} />
                  </TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{saleTransactionItem.soldPrice?.price}</TableCell>
                  <TableCell>{subTotal}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default RetailShopSaleDetail;
