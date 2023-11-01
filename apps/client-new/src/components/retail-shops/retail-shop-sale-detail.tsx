import React, { useEffect, useState } from "react";
import {
  SaleTransaction,
  SaleTransactionItem,
} from "../../../types/sale-transaction";
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
import { StockItem } from "../../../types/product";

type Props = {
  saleTransaction: SaleTransaction;
  closeDetail: () => void;
  retailShopId: string;
};
interface SelectedRetailShopStockItem {
  saleTransactionItem: SaleTransactionItem;
  selectedQuantity: number;
}

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
        filterRetailShopStockInput: {
          retailShopId: retailShopId,
        },
      },
    }
  );

  const [selectedRetailShopStockItems, setSelectedRetailShopStockItems] =
    useState<SelectedRetailShopStockItem[]>([]);

  const [retailShopStocks, setRetailShopStocks] = useState<StockItem[]>();
  useEffect(() => {
    if (itemsData) {
      setRetailShopStocks(
        JSON.parse(
          JSON.stringify(itemsData.retailShopStockByRetailShopId.items)
        )
      );
    }
  }, [itemsData]);

  useEffect(() => {
    getRetailShopStockData();
    setSelectedRetailShopStockItems &&
      setSelectedRetailShopStockItems(
        saleTransaction.saleTransactionItems.map((item) => ({
          saleTransactionItem: {
            ...item,
            quantity:
              itemsData?.retailShopStockByRetailShopId.items.find(
                (i) => i.product.id === item.product.id
              )?.quantity ?? 0,
          },
          selectedQuantity: item.quantity,
        }))
      );
  }, [retailShopId, itemsData]);

  const handleAddItem = (
    retailShopStock: StockItem,
    quantity: number
  ) => {
    const selectedStockItem: SelectedRetailShopStockItem = {
      saleTransactionItem: {
        ...retailShopStock,
        quantity: retailShopStock.quantity - quantity,
      },
      selectedQuantity: quantity,
    };

    setSelectedRetailShopStockItems((prev) => [
      ...selectedRetailShopStockItems,
      selectedStockItem,
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
            productId: item.saleTransactionItem.product.id,
            quantity: item.selectedQuantity,
          })),
        },
      },
      onCompleted: (data) => {
        showAlert("updated a", "sale transaction");
      },
    });
  };
  // const handleAddItem = (stockItem: SelectedRetailShopStockItem) => {
  //   setSelectedRetailShopStockItems((prev) => [...prev, stockItem]);
  // };
  const handleRemoveItem = (
    selectedRetailShopStockItem: SelectedRetailShopStockItem
  ) => {
    setRetailShopStocks((prev) =>
      prev?.map((item) => {
        if (
          item.product.id ===
          selectedRetailShopStockItem.saleTransactionItem.product.id
        ) {
          return {
            ...item,
            quantity:
              item.quantity + selectedRetailShopStockItem.selectedQuantity,
          };
        }
        return item;  
      })
    );
    setSelectedRetailShopStockItems((prev) =>
      prev.filter(
        (i) =>
          i.saleTransactionItem.product.id !==
          selectedRetailShopStockItem.saleTransactionItem.product.id
      )
    );
  };

  const handleQuantityChange = (
    selectedRetailShopStockItem: SelectedRetailShopStockItem,
    val: number
  ) => {
    if (selectedRetailShopStockItem.selectedQuantity + val <= 0) {
      setSelectedRetailShopStockItems(
        selectedRetailShopStockItems.filter(
          (item) =>
            item.saleTransactionItem.product.id !==
            selectedRetailShopStockItem.saleTransactionItem.product.id
        )
      );
    } else if (
      // selectedRetailShopStockItem.selectedQuantity + val >
      selectedRetailShopStockItem.saleTransactionItem.quantity - val <
      0
    ) {
      return;
    } else {
      selectedRetailShopStockItem.selectedQuantity += val;
      selectedRetailShopStockItem.saleTransactionItem.quantity -= val;

      setSelectedRetailShopStockItems((prev) =>
        prev.map((item) => {
          if (
            item.saleTransactionItem.product.id ===
            selectedRetailShopStockItem.saleTransactionItem.product.id
          ) {
            return selectedRetailShopStockItem;
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
        handleAddItem={handleAddItem}
        retailShopId={retailShopId}
        selectedItemsId={selectedRetailShopStockItems.map(
          (item) => item.saleTransactionItem.product.id
        )}
        setOpen={setModalOpen}
        retailShopStocks={retailShopStocks||[]}
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
              <TableCell>Selected Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Subtotal Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedRetailShopStockItems.map(
              (selectedSaleTransactionItem, idx) => {
                const { product, subTotal, quantity } =
                  selectedSaleTransactionItem.saleTransactionItem;
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
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {selectedSaleTransactionItem.selectedQuantity}
                        <Stack>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() =>
                              handleQuantityChange(
                                selectedSaleTransactionItem,
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
                                selectedSaleTransactionItem,
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
                        selectedSaleTransactionItem.saleTransactionItem.product
                          ?.activePrice.price
                      }
                    </TableCell>
                    <TableCell>{subTotal}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleRemoveItem(selectedSaleTransactionItem)
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