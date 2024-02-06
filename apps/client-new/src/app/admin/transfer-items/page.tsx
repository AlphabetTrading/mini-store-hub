"use client";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  CardHeader,
  Button,
  CircularProgress,
  Input,
  SvgIcon,
  AlertTitle,
  Alert,
} from "@mui/material";
import ItemsSummaryTable from "@/components/transfer-items/items-summary-table";

import { useLazyQuery, useMutation } from "@apollo/client";
import {
  WAREHOUSE_STOCKS,
  WarehouseStockData,
  WarehouseStockVars,
} from "@/graphql/products/queries";
import RetailShopsList from "@/components/transfer-items/retail-shops-list";
import {
  TRANSFER_GOODS,
  TransferGoodsData,
  TransferGoodsVars,
} from "@/graphql/transfer-goods/mutations";
import { TransferType } from "../../../../types/goods-transfer";
import { showAlert } from "@/helpers/showAlert";
import SearchIcon from "@mui/icons-material/Search";
import { GET_TOTAL_VALUATION_OF_WAREHOUSE } from "@/graphql/warehouse-managers/queries";
import { WAREHOUSE_TRANSACTION_HISTORY } from "@/graphql/transfer-goods/queries";
import WarehouseRadioGroup from "@/components/transfer-items/warehouse-radio-group";
import { SelectedStockItem, StockItem } from "../../../../types/stock-item";
import TransferItemsDrawer from "@/components/modals/transfer-items-drawer";
import ItemsSummaryWRS from "@/components/transfer-items/items-summary-w-rs";

type Props = {};

const Page = (props: Props) => {
  const [transferGoodsToRetailshop, { data, error, loading }] = useMutation<
    TransferGoodsData,
    TransferGoodsVars
  >(TRANSFER_GOODS);

  const [
    getWarehouseStockData,
    { data: itemsData, loading: itemsLoading, error: itemsError },
  ] = useLazyQuery<WarehouseStockData, WarehouseStockVars>(WAREHOUSE_STOCKS);

  const [warehouseStocks, setWarehouseStocks] = useState<StockItem[]>([]);

  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(
    null
  );
  useEffect(() => {
    getWarehouseStockData({
      variables: {
        filterWarehouseStockInput: {
          warehouse: {
            id: selectedWarehouse || "",
          },
        },
      },
    });
  }, [selectedWarehouse]);

  useEffect(() => {
    if (itemsData) {
      setWarehouseStocks(
        JSON.parse(JSON.stringify(itemsData.warehouseStocks.items))
      );
    }
  }, [itemsData]);

  const [selectedItems, setSelectedItems] = useState<
    SelectedStockItem[]
  >([]);
  const [selectedRetailShop, setSelectedRetailShop] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<{
    retailShop: string;
    items: string;
    warehouse: string;
  }>({ retailShop: "", items: "", warehouse: "" });

  const [filteredItems, setFilteredItems] = useState<
    SelectedStockItem[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredItems(
      selectedItems.filter((item) => filteredItems.includes(item))
    );
    handleSearch(searchQuery);
  }, [selectedItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (query: string) => {
    setFilteredItems(
      selectedItems.filter(
        ({ stockItem }) =>
        stockItem.product.name.toLowerCase().includes(query) ||
        stockItem.product.serialNumber.includes(query)
      )
    );
  };

  const handleTransferItems = async () => {
    if (selectedItems.length === 0) {
      setFormError({
        retailShop: "",
        items: "Select at least one item",
        warehouse: "",
      });
      return;
    }
    if (!selectedRetailShop) {
      setFormError({
        items: "",
        retailShop: "Select a retail shop",
        warehouse: "",
      });
      return;
    }
    if (!selectedWarehouse) {
      setFormError({
        items: "",
        retailShop: "",
        warehouse: "Select a warehouse",
      });
      return;
    }
    setFormError({
      items: "",
      retailShop: "",
      warehouse: "",
    });
    await transferGoodsToRetailshop({
      variables: {
        data: {
          goods: selectedItems.map((item) => ({
            productId: item.stockItem.product.id,
            quantity: item.selectedQuantity,
            // price: item.warehouseStock.product.activePrice.price,
          })),
          retailShopId: selectedRetailShop!,
          sourceWarehouseId: selectedWarehouse || "",
          transferType: TransferType.WarehouseToRetailShop,
        },
      },
      refetchQueries: [
        {
          query: WAREHOUSE_STOCKS,
          variables: {
            filterWarehouseStockInput: {
              warehouse: {
                id: selectedWarehouse || "",
              },
            },
          },
        },
        {
          query: GET_TOTAL_VALUATION_OF_WAREHOUSE,
          variables: {
            warehouseId: selectedWarehouse,
          },
        },
        {
          query: WAREHOUSE_TRANSACTION_HISTORY,
          variables: {
            warehouseId: selectedWarehouse,
          },
        },
      ],
      onCompleted: (data) => {
        setSelectedItems([]);
        setSelectedRetailShop(null);
        setSelectedWarehouse(null);

        showAlert("transferred a", "stock");
      },
    });
  };

  const [open, setOpen] = useState(false);

  const handleAddItem = (warehouseStock: StockItem, quantity: number) => {
    const selectedStockItem: SelectedStockItem = {
      stockItem: warehouseStock,
      selectedQuantity: quantity,
    };
    setSelectedItems((prev) => [...selectedItems, selectedStockItem]);
  };
  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.filter((stock) => stock.stockItem.product.id !== id)
    );
  };

  return (
    <>
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={1}>
                <Typography variant="h4">Transfer Items</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link component={NextLink} href={"/admin/dashboard"}>
                    Dashboard
                  </Link>
                  <Link component={NextLink} href={"/admin/transfer-items"}>
                    Transfer Items
                  </Link>
                  <Typography>List</Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            <Grid container spacing={2}>
              <Grid item sm={12} md={8} xs={12}>
                <Card>
                  <CardHeader title="From: Warehouse" />
                  <WarehouseRadioGroup
                    selectedWarehouse={selectedWarehouse}
                    setSelectedWarehouse={setSelectedWarehouse}
                  />
                </Card>
              </Grid>
              <Grid item sm={12} md={4} xs={12}>
                <Card>
                  <CardHeader title="To: Retail Shop" />
                  <RetailShopsList
                    selectedRetailShop={selectedRetailShop}
                    setSelectedRetailShop={setSelectedRetailShop}
                  />
                </Card>
              </Grid>
            </Grid>
            <Card>
              <CardHeader
                action={
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    Add
                  </Button>
                }
                title="Selected Products"
              />
              <Stack
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
                direction="row"
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
                <Input
                  disableUnderline
                  placeholder="Search by name or serial number"
                  value={searchQuery}
                  fullWidth
                  onChange={handleChange}
                />
              </Stack>
              <ItemsSummaryWRS
                handleRemoveItem={handleRemoveItem}
                filteredItems={filteredItems}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </Card>
          </Stack>
          <Button
            disabled={loading}
            variant="contained"
            sx={{ my: 2 }}
            onClick={() => handleTransferItems()}
          >
            {loading && (
              <CircularProgress
                size={16}
                sx={{ mr: 1, color: "neutral.500" }}
              />
            )}
            Transfer Items
          </Button>
          {formError.retailShop && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {formError.retailShop}
            </Alert>
          )}
          {formError.warehouse && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {formError.warehouse}
            </Alert>
          )}
          {formError.items && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {formError.items}
            </Alert>
          )}
          {error && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {error.message}
            </Alert>
          )}
        </Container>
      </Box>
      <TransferItemsDrawer
        selectedItemsId={selectedItems.map(
          (item) => item.stockItem.product.id
        )}
        handleAddItem={handleAddItem}
        open={open}
        setOpen={setOpen}
        setSelectedItems={setSelectedItems}
        warehouseId={selectedWarehouse || ""}
        warehouseStocks={warehouseStocks}
      />
    </>
  );
};

export default Page;
