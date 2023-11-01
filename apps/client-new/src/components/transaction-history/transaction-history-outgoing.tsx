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
import TransferItemsDrawer, {
  SelectedWarehouseStockItem,
} from "../modals/transfer-items-drawer";
import { GoodsTransfer } from "../../../types/goods-transfer";
import {
  UPDATE_TRANSFER_GOODS,
  updateTransferGoodsData,
  updateTransferGoodsVars,
} from "@/graphql/transfer-goods/mutations";
import { showAlert } from "@/helpers/showAlert";
import { useRouter } from "next/navigation";
import { StockItem } from "../../../types/product";
import StateHandler from "../state-handler";

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
    useState<SelectedWarehouseStockItem[]>([]);

  const [warehouseStocks, setWarehouseStocks] = useState<StockItem[]>([]);
  useEffect(() => {
    if (itemsData) {
      setWarehouseStocks(JSON.parse(JSON.stringify(itemsData.warehouseStocks.items)));
    }
  }, [itemsData]);

  useEffect(() => {
    getWarehouseStockData();
    setSelectedWarehouseStockItems &&
      setSelectedWarehouseStockItems(
        transactionHistory.goods.map((item) => {
          return {
            warehouseStock: {
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

  const handleAddItem = (
    warehouseStockItem: StockItem,
    quantity: number
  ) => {
    const selectedStockItem: SelectedWarehouseStockItem = {
      warehouseStock: {...warehouseStockItem,quantity:warehouseStockItem.quantity-quantity},
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
            productId: item.warehouseStock.product.id,
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
    selectedWarehouseStockItem: SelectedWarehouseStockItem
  ) => {
    setWarehouseStocks((prev) =>
      prev?.map((item) => {
        if (
          item.product.id ===
          selectedWarehouseStockItem.warehouseStock.product.id
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
          i.warehouseStock.product.id !==
          selectedWarehouseStockItem.warehouseStock.product.id
      )
    );
  }

    const handleItemQuantityChange = (
      selectedItem: SelectedWarehouseStockItem,
      val: number
    ) => {
      if (selectedItem.selectedQuantity + val <= 0) {
        setSelectedWarehouseStockItems(
          selectedWarehouseStockItems.filter(
            (item) =>
              item.warehouseStock.product.id !==
              selectedItem.warehouseStock.product.id
          )
        );
      } else if (
        // selectedItem.selectedQuantity + val >
        selectedItem.warehouseStock.quantity - val <
        0
      ) {
        return;
      } else {
        selectedItem.selectedQuantity += val;
        selectedItem.warehouseStock.quantity -= val;

        setSelectedWarehouseStockItems((prev) =>
          prev.map((item) => {
            if (
              item.warehouseStock.product.id ===
              selectedItem.warehouseStock.product.id
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
      <StateHandler loading={itemsLoading} error={itemsError} empty={itemsData?.warehouseStocks.items.length==0}>
        <TransferItemsDrawer
          warehouseId={warehoueId}
          open={modalOpen}
          handleAddItem={handleAddItem}
          selectedItemsId={selectedWarehouseStockItems.map(
            (item) => item.warehouseStock.product.id
          )}
          setOpen={setModalOpen}
          warehouseStocks={warehouseStocks}
          // selectedStockItems={newSaleTransactionItems}
          // handleClose={() => setModalOpen(false)}
        />
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
                  const { warehouseStock, selectedQuantity } =
                    selectedWarehouseStockItem;
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <Stack direction="row" alignItems="center">
                          <>
                            {warehouseStock.product.images?.length > 0 ? (
                              <Box
                                sx={{
                                  alignItems: "center",
                                  backgroundColor: "neutral.50",
                                  backgroundImage: `url("${warehouseStock.product.images[0]}")`,
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
                              {warehouseStock.product.name}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                              {warehouseStock.product.serialNumber}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <CustomChip label={warehouseStock.product.unit || ""} />
                      </TableCell>
                      <TableCell>{warehouseStock.quantity}</TableCell>
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
                          selectedWarehouseStockItem.warehouseStock.product
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
