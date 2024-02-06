import React, { useEffect, useState } from "react";
import {
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
import SaleTransactionItemsDrawer from "../modals/sale-transaction-items-modal";
import {
  RetailShopStockData,
  RetailShopStockVars,
  RETAIL_SHOP_STOCK,
} from "@/graphql/retail-shops/queries";
import { showAlert } from "@/helpers/showAlert";
import StateHandler from "../state-handler";
import { RetailShopStockItem, SelectedRetailShopStockItem, StockItem } from "../../../types/stock-item";
import { RetailShopSaleTransaction, RetailShopTransactionItem, SelectedRetailShopSaleTransactionItem } from "../../../types/retail-shop-transaction-item";

type Props = {
  saleTransaction: RetailShopSaleTransaction;
  closeDetail: () => void;
  retailShopId: string;
};

const RetailShopSaleDetail = ({
  saleTransaction,
  closeDetail,
  retailShopId,
}: Props) => {
  const [
    getRetailShopStockData,
    { data: itemsData, loading: itemsLoading, error: itemsError },
  ] = useLazyQuery<RetailShopStockData, RetailShopStockVars>(
    RETAIL_SHOP_STOCK,
    {
      variables: {
        orderBy: {
          product: {
            name: "asc",
          },
        },
        filterRetailShopStockInput: {
          retailShopId: retailShopId,
        },
      },
    }
  );
  console.log(itemsData)
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [
    selectedRetailShopStockItems,
    setSelectedRetailShopStockItems,
  ] = useState<SelectedRetailShopStockItem[]>([]);

  const [retailShopStocks, setRetailShopStocks] = useState<RetailShopStockItem[]>();
  useEffect(() => {
    if (itemsData) {
      setRetailShopStocks(
        JSON.parse(
          JSON.stringify(itemsData.retailShopStockByRetailShopId.items)
        )
      );
    }
  }, [itemsData]);
  const [selectedItems, setSelectedItems] = React.useState<
  SelectedRetailShopStockItem[]
>([]);


  useEffect(() => {
    getRetailShopStockData();
    setSelectedRetailShopStockItems &&
    setSelectedRetailShopStockItems(
        saleTransaction.retailShopTransactionItems?.map((item:RetailShopTransactionItem) => {
          return {
            retailShopStockItem: {
              ...item.retailShopStock,
              quantity:
                itemsData?.retailShopStockByRetailShopId.items.find(
                  (i) => i.product?.id === item?.retailShopStock.product?.id
                )?.quantity ?? 0,
            },
            selectedQuantity: item.quantity,
          };

        })
      //   saleTransaction.retailShopTransactionItems?.map((item) => {
      
      //   return {
      //     saleTransactionItem: {
      //       ...item,
      //       quantity:
      //         itemsData?.retailShopStockByRetailShopId.items.find(
      //           (i) => i.product?.id === item?.product?.id
      //         )?.quantity ?? 0,
      //     },
      //     selectedQuantity: item.quantity,
      //   };

      // })
      );
  }, [retailShopId, itemsData]);

  const handleAddItems = (items: SelectedRetailShopStockItem[]) => {
    const selectedStockItems: SelectedRetailShopStockItem[] = items.map((item)=> ({
      retailShopStockItem: {
        ...item.retailShopStockItem,
        quantity: item.retailShopStockItem.quantity - item.selectedQuantity,
      },
      selectedQuantity: item.selectedQuantity,
    }));

    setSelectedRetailShopStockItems((prev) => [
      ...selectedRetailShopStockItems,
      ...selectedStockItems,
    ]);
  };

  const [updateSaleTransaction, { data, loading, error }] = useMutation<
    UpdateSaleTransactionData,
    UpdateSaleTransactionVars
  >(UPDATE_SALE_TRANSACTION);

  // const [newSaleTransactionItems, setNewSaleTransactionItems] = useState<
  //   SaleTransactionItem[]
  // >(JSON.parse(JSON.stringify(saleTransaction.saleTransactionItems)));

  const handleUpdateSaleTransaction = async () => {
    await updateSaleTransaction({
      variables: {
        updateSaleTransactionId: saleTransaction.id,
        data: {
          goods: selectedRetailShopStockItems.map((item) => ({
            productId: item.retailShopStockItem.product.id,
            quantity: item.selectedQuantity,
          })),
        },
      },
      onCompleted: (data) => {
        showAlert("updated a", "sale transaction");
      },
    });
  };
  // const handleAddItem = (stockItem: SelectedRetailShopSaleTransaction) => {
  //   setSelectedRetailShopSaleTransactions((prev) => [...prev, stockItem]);
  // };
  const handleRemoveItem = (
    selectedRetailShopStockItem: SelectedRetailShopStockItem
  ) => {
    setRetailShopStocks((prev) =>
      prev?.map((item) => {
        if (
          item.product.id ===
          selectedRetailShopStockItem.retailShopStockItem.product.id
        ) {
          return {
            ...item,
            quantity:
              item.quantity +
              selectedRetailShopStockItem.selectedQuantity,
          };
        }
        return item;
      })
      );
      setSelectedItems((prev)=>prev.filter((item)=>item.retailShopStockItem.product.id !== selectedRetailShopStockItem.retailShopStockItem.product.id));
      setSelectedRetailShopStockItems((prev) =>
      prev.filter(
        (i) =>
          i.retailShopStockItem.product.id !==
          selectedRetailShopStockItem.retailShopStockItem.product.id
      )
    );
  };

  const handleQuantityChange = (
    selectedRetailShopStock: SelectedRetailShopStockItem,
    val: number
  ) => {
    if (selectedRetailShopStock.selectedQuantity + val <= 0) {
      setSelectedRetailShopStockItems(
        selectedRetailShopStockItems.filter(
          (item) =>
            item.retailShopStockItem.product.id !==
            selectedRetailShopStock.retailShopStockItem.product.id
        )
      );
    } else if (
      // selectedRetailShopSaleTransaction.selectedQuantity + val >
      selectedRetailShopStock.retailShopStockItem.quantity - val <
      0
    ) {
      return;
    } else {
      selectedRetailShopStock.selectedQuantity += val;
      selectedRetailShopStock.retailShopStockItem.quantity -= val;

      setSelectedRetailShopStockItems((prev) =>
        prev.map((item) => {
          if (
            item.retailShopStockItem.product.id ===
            selectedRetailShopStock.retailShopStockItem.product.id
          ) {
            return selectedRetailShopStock;
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
      empty={itemsData?.retailShopStockByRetailShopId.items.length === 0}
    >
      <SaleTransactionItemsDrawer
        open={modalOpen}
        handleAddItems={handleAddItems}
        retailShopId={retailShopId}
        selectedItemsId={selectedRetailShopStockItems?.map(
          (item) => item.retailShopStockItem?.product?.id
        )}
        setOpen={setModalOpen}
        retailShopStocks={retailShopStocks || []}
        searchQuery=""
        setSearchQuery={setSearchQuery}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        retailShopStockLoading={itemsLoading}
        retailShopStockError={itemsError} // selectedStockItems={newSaleTransactionItems}
        // handleClose={() => setModalOpen(false)}
        selectedItems={selectedItems} 
        setSelectedItems={setSelectedItems}
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
            onClick={handleUpdateSaleTransaction}
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
              {saleTransaction.total} 
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
              {saleTransaction.retailShopTransactionItems?.length}
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
              <TableCell>Selected Quantity</TableCell>
              <TableCell>Price</TableCell>
              {/* <TableCell>Subtotal Price</TableCell> */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedRetailShopStockItems?.map(
              (selectedRetailShopStockItem, idx) => {

                
                const { retailShopStockItem } = selectedRetailShopStockItem;
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <Stack direction="row" alignItems="center">
                        <>
                          {retailShopStockItem.product?.images?.length > 0 ? (
                            <Box
                              sx={{
                                alignItems: "center",
                                backgroundColor: "neutral.50",
                                backgroundImage: `url("${retailShopStockItem.product.images[0]}")`,
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
                            {retailShopStockItem.product?.name}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            {retailShopStockItem.product?.serialNumber}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <CustomChip label={retailShopStockItem.product?.unit || ""} />
                    </TableCell>
                    <TableCell>{retailShopStockItem.quantity}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {selectedRetailShopStockItem.selectedQuantity}
                        <Stack>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() =>
                              handleQuantityChange(
                                selectedRetailShopStockItem,
                                1
                              )
                            }
                          >
                            <ArrowDropUp />
                          </IconButton>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() =>
                              handleQuantityChange(
                                selectedRetailShopStockItem,
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
                        selectedRetailShopStockItem.retailShopStockItem?.activePrice?.price
                      }
                    </TableCell>
                    {/* <TableCell>{selectedRetailShopStockItem.retailShopStockItem.}</TableCell> */}
                    
                    {/* <TableCell>{0}</TableCell> */}

                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleRemoveItem(selectedRetailShopStockItem)
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

export default RetailShopSaleDetail;
