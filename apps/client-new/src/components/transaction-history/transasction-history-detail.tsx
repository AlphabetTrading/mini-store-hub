import React from 'react'
import { TransactionHistory } from '../../../types/transaction-history'
import { ArrowBack, ImageOutlined } from '@mui/icons-material'
import { IconButton, SvgIcon, Card, Box, Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material'
import CustomChip from '../custom-chip'

type Props = {
  closeDetail: () => void
  transactionHistory: TransactionHistory
}

const TransactionHistoryDetail = ({closeDetail,transactionHistory}: Props) => {
  return (
    <div>
      <IconButton onClick={closeDetail}>
        <SvgIcon sx={{ mr: 1 }}>
          <ArrowBack />
        </SvgIcon>
      </IconButton>
      <Card>
        {/* <Box sx={{ display: "flex" }}>
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
              {transactionHistory.totalPrice}
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
        </Box> */}
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
          
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory.goods.map(
              (stockItem, idx) => {
                const { product, quantity } = stockItem;
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
                   <TableCell>
                      {product.activePrice?.price}
                    </TableCell>
                    
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
            }
export default TransactionHistoryDetail