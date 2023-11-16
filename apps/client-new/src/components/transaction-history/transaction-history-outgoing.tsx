import React, { use, useEffect, useState } from "react";
import {
  SaleTransaction,
  SaleTransactionItem,
} from "../../../types/sale-transaction";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CircularProgress,
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
import {
  ArrowBack,
  ArrowDropDown,
  ArrowDropUp,
  DeleteOutline,
  ImageOutlined,
} from "@mui/icons-material";
import CustomChip from "../custom-chip";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  UPDATE_SALE_TRANSACTION,
  UpdateSaleTransactionData,
  UpdateSaleTransactionVars,
} from "@/graphql/sale-transaction/mutations";
import {
  WAREHOUSE_STOCKS,
  WarehouseStockData,
  WarehouseStockVars,
} from "@/graphql/products/queries";
import TransferItemsDrawer from "../modals/transfer-items-drawer";
import { GoodsTransfer } from "../../../types/goods-transfer";
import {
  UPDATE_TRANSFER_GOODS,
  updateTransferGoodsData,
  updateTransferGoodsVars,
} from "@/graphql/transfer-goods/mutations";
import { showAlert } from "@/helpers/showAlert";
import { useRouter } from "next/navigation";
import StateHandler from "../state-handler";
import { SelectedStockItem, StockItem } from "../../../types/stock-item";

type Props = {
  transactionHistory: GoodsTransfer;
  closeDetail: () => void;
  warehoueId: string;
};

const TransactionHistoryOutgoing = ({
  transactionHistory,
  closeDetail,
  warehoueId,
}: Props) => {
  const [
    getWarehouseStockData,
    { data: itemsData, loading: itemsLoading, error: itemsError },
  ] = useLazyQuery<WarehouseStockData, WarehouseStockVars>(WAREHOUSE_STOCKS, {
    variables: {
      filterWarehouseStockInput: {
        warehouse: {
          id: warehoueId,
        },
      },
    },
  });

  const [selectedWarehouseStockItems, setSelectedWarehouseStockItems] =
    useState<SelectedStockItem[]>([]);

  const [warehouseStocks, setWarehouseStocks] = useState<StockItem[]>([]);
  useEffect(() => {
    if (itemsData) {
      setWarehouseStocks(
        JSON.parse(JSON.stringify(itemsData.warehouseStocks.items))
      );
    }
  }, [itemsData]);

  useEffect(() => {
    getWarehouseStockData();
    setSelectedWarehouseStockItems &&
      setSelectedWarehouseStockItems(
        transactionHistory.goods.map((item) => {
          return {
            stockItem: {
              ...item,
              quantity:
                itemsData?.warehouseStocks.items.find(
                  (i) => i.product.id === item.product.id
                )?.quantity ?? 0,
            },
            selectedQuantity: item.quantity,
          };
        })
      );
  }, [warehoueId, itemsData]);

  const handleAddItem = (warehouseStockItem: StockItem, quantity: number) => {
    const selectedStockItem: SelectedStockItem = {
      stockItem: {
        ...warehouseStockItem,
        quantity: warehouseStockItem.quantity - quantity,
      },
      selectedQuantity: quantity,
    };
    setSelectedWarehouseStockItems((prev) => [
      ...selectedWarehouseStockItems,
      selectedStockItem,
    ]);
  };

  const [updateGoodsTransfer, { data, loading, error }] = useMutation<
    updateTransferGoodsData,
    updateTransferGoodsVars
  >(UPDATE_TRANSFER_GOODS);

  // const [newSaleTransactionItems, setNewSaleTransactionItems] = useState<
  //   SaleTransactionItem[]
  // >(JSON.parse(JSON.stringify(saleTransaction.saleTransactionItems)));
  const router = useRouter();
  const handleUpdateGoodsTransfer = async () => {
    await updateGoodsTransfer({
      variables: {
        data: {
          goods: selectedWarehouseStockItems.map((item) => ({
            productId: item.stockItem.product.id,
            quantity: item.selectedQuantity,
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
  // const handleAddItem = (stockItem: SelectedRetailShopStockItem) => {
  //   setSelectedWarehouseStockItem((prev) => [...prev, stockItem]);
  // };
  // const handleRemoveItem = (stockItemId: string) => {
  //   setSelectedWarehouseStockItems((prev) =>
  //     prev.filter((i) => i.warehouseStock.product.id !== stockItemId)
  //   );
  // };

  const handleRemoveItem = (
    selectedWarehouseStockItem: SelectedStockItem
  ) => {
    setWarehouseStocks((prev) =>
      prev?.map((item) => {
        if (
          item.product.id ===
          selectedWarehouseStockItem.stockItem.product.id
        ) {
          return {
            ...item,
            quantity:
              item.quantity + selectedWarehouseStockItem.selectedQuantity,
          };
        }
        return item;
      })
    );
    setSelectedWarehouseStockItems((prev) =>
      prev.filter(
        (i) =>
          i.stockItem.product.id !==
          selectedWarehouseStockItem.stockItem.product.id
      )
    );
  };

  const handleItemQuantityChange = (
    selectedItem: SelectedStockItem,
    val: number
  ) => {
    if (selectedItem.selectedQuantity + val <= 0) {
      setSelectedWarehouseStockItems(
        selectedWarehouseStockItems.filter(
          (item) =>
            item.stockItem.product.id !==
            selectedItem.stockItem.product.id
        )
      );
    } else if (
      // selectedItem.selectedQuantity + val >
      selectedItem.stockItem.quantity - val <
      0
    ) {
      return;
    } else {
      selectedItem.selectedQuantity += val;
      selectedItem.stockItem.quantity -= val;

      setSelectedWarehouseStockItems((prev) =>
        prev.map((item) => {
          if (
            item.stockItem.product.id ===
            selectedItem.stockItem.product.id
          ) {
            return selectedItem;
          } else {
            return item;
          }
        })
      );
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <StateHandler
      loading={itemsLoading}
      error={itemsError}
      empty={itemsData?.warehouseStocks.items.length == 0}
    >
      <TransferItemsDrawer
        warehouseId={warehoueId}
        open={modalOpen}
        handleAddItem={handleAddItem}
        selectedItemsId={selectedWarehouseStockItems.map(
          (item) => item.stockItem.product.id
        )}
        setOpen={setModalOpen}
        warehouseStocks={warehouseStocks}
        // selectedStockItems={newSaleTransactionItems}
        // handleClose={() => setModalOpen(false)}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton onClick={closeDetail}>
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowBack />
          </SvgIcon>
        </IconButton>

        <Stack direction="row" spacing={1}>
          <Button
            disabled={loading}
            variant="outlined"
            onClick={handleUpdateGoodsTransfer}
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
      {error && (
        <Alert color="error">
          <AlertTitle>Error</AlertTitle>
          {error?.message}
        </Alert>
      )}
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
        </Box> */}
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Selected Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedWarehouseStockItems.map(
              (selectedWarehouseStockItem, idx) => {
                const { stockItem, selectedQuantity } =
                  selectedWarehouseStockItem;
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <Stack direction="row" alignItems="center">
                        <>
                          {stockItem.product.images?.length > 0 ? (
                            <Box
                              sx={{
                                alignItems: "center",
                                backgroundColor: "neutral.50",
                                backgroundImage: `url("${stockItem.product.images[0]}")`,
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
                            {stockItem.product.name}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            {stockItem.product.serialNumber}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <CustomChip label={stockItem.product.unit || ""} />
                    </TableCell>
                    <TableCell>{stockItem.quantity}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {selectedQuantity}
                        <Stack>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() =>
                              handleItemQuantityChange(
                                selectedWarehouseStockItem,
                                1
                              )
                            }
                          >
                            <ArrowDropUp />
                          </IconButton>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() =>
                              handleItemQuantityChange(
                                selectedWarehouseStockItem,
                                -1
                              )
                            }
                          >
                            <ArrowDropDown />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {
                        selectedWarehouseStockItem.stockItem.product
                          ?.activePrice.price
                      }
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleRemoveItem(selectedWarehouseStockItem)
                        }
                      >
                        <DeleteOutline color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </Card>
    </StateHandler>
  );
};

export default TransactionHistoryOutgoing;
