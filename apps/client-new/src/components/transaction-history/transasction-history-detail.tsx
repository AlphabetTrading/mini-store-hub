import React, { useState } from "react";
import {
  ArrowBack,
  ArrowDropDown,
  ArrowDropUp,
  DeleteOutline,
  ImageOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  SvgIcon,
  Card,
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import CustomChip from "../custom-chip";
import { StockItem } from "../../../types/product";
import { AddIncomingItemModal } from "../modals/incoming-items-modal";
import { useMutation } from "@apollo/client";
import {
  UPDATE_TRANSFER_GOODS,
  updateTransferGoodsData,
  updateTransferGoodsVars,
} from "@/graphql/transfer-goods/mutations";
import { GoodsTransfer } from "../../../types/goods-transfer";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";
import { WAREHOUSE_STOCKS } from "@/graphql/products/queries";

type Props = {
  closeDetail: () => void;
  transactionHistory: GoodsTransfer;
};

const TransactionHistoryDetail = ({
  closeDetail,
  transactionHistory,
}: Props) => {
  const [newStockItems, setNewStockItems] = useState<StockItem[]>(
    JSON.parse(JSON.stringify(transactionHistory.goods))
  );
  const router = useRouter();

  const handleQuantityChange = (stockItem: StockItem, val: number) => {
    setNewStockItems((prev) => {
      if (stockItem.quantity + val <= 0) {
        return prev.filter((i) => i.product.id !== stockItem.product.id);
      }
      return prev.map((i) => {
        if (i.product.id === stockItem.product.id) {
          return { ...i, quantity: i.quantity + val };
        } else return i;
      });
    });
  };

  const handleRemoveItem = (stockItemId: string) => {
    setNewStockItems((prev) =>
      prev.filter((i) => i.product.id !== stockItemId)
    );
  };

  const handleAddItem = (stockItem: StockItem) => {
    setNewStockItems((prev) => [...prev, stockItem]);
  };

  const handleUpdateTransferGoods = async () => {
    await updateTransferGoods({
      variables: {
        data: {
          goods: newStockItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        },
        updateGoodsTransferId: transactionHistory.id,
      },
      onCompleted: () => {
        showAlert("updated a", "transaction");
        router.back();
      },

    });

  };
  const [modalOpen, setModalOpen] = useState(false);

  const [updateTransferGoods, { loading, error }] = useMutation<
    updateTransferGoodsData,
    updateTransferGoodsVars
  >(UPDATE_TRANSFER_GOODS);

  return (
    <>
      <AddIncomingItemModal
        open={modalOpen}
        handleAddItem={handleAddItem}
        selectedStockItems={newStockItems}
        handleClose={() => setModalOpen(false)}
      />

      <Stack spacing={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={closeDetail}>
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowBack />
            </SvgIcon>
          </IconButton>
          <Stack direction="row" spacing={1}>
            <Button
              disabled={loading}
              variant="outlined"
              onClick={handleUpdateTransferGoods}
            >
              {loading && (
                <CircularProgress
                  sx={{ mr: 1, color: "neutral.500" }}
                  size={16}
                />
              )}
              Submit Changes
            </Button>
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              Add Items
            </Button>
          </Stack>
        </Stack>
        <Card>
          {error && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {error?.message}
            </Alert>
          )}

          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newStockItems.map((stockItem, idx) => {
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
                            SN- {product.serialNumber}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <CustomChip label={product.unit || ""} />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {quantity}
                        <Stack>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => handleQuantityChange(stockItem, 1)}
                          >
                            <ArrowDropUp />
                          </IconButton>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => handleQuantityChange(stockItem, -1)}
                          >
                            <ArrowDropDown />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.activePrice?.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveItem(product.id)}>
                        <DeleteOutline color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </Stack>
    </>
  );
};
export default TransactionHistoryDetail;
