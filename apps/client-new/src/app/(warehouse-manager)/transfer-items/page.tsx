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

import { useMutation, useQuery } from "@apollo/client";
import {
  WAREHOUSE_STOCKS,
  WarehouseStockData,
  WarehouseStockVars,
} from "@/graphql/products/queries";
import TransferItemsDrawer, {
  SelectedWarehouseStockItem,
} from "@/components/modals/transfer-items-drawer";
import { StockItem } from "../../../../types/product";
import RetailShopsList from "@/components/transfer-items/retail-shops-list";
import {
  TRANSFER_GOODS,
  TransferGoodsData,
  TransferGoodsVars,
} from "@/graphql/transfer-goods/mutations";
import { useSession } from "next-auth/react";
import { TransferType } from "../../../../types/goods-transfer";
import { showAlert } from "@/helpers/showAlert";
import SearchIcon from "@mui/icons-material/Search";
import { GET_TOTAL_VALUATION_OF_WAREHOUSE } from "@/graphql/warehouse-managers/queries";
import { WAREHOUSE_TRANSACTION_HISTORY } from "@/graphql/transfer-goods/queries";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();
  const warehouseId = (sessionData?.user as any).warehouseId || "";
  const [transferGoodsToRetailshop, { data, error, loading }] = useMutation<
    TransferGoodsData,
    TransferGoodsVars
  >(TRANSFER_GOODS);

  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError,
  } = useQuery<WarehouseStockData, WarehouseStockVars>(WAREHOUSE_STOCKS, {
    variables: {
      filterWarehouseStockInput: {
        warehouse: {
          id: warehouseId,
        },
      },
    },
  });

  const [warehouseStocks, setWarehouseStocks] = useState<StockItem[]>([]);
  useEffect(() => {
    if (itemsData) {
      setWarehouseStocks(
        JSON.parse(JSON.stringify(itemsData.warehouseStocks.items))
      );
    }
  }, [itemsData]);

  const [selectedItems, setSelectedItems] = useState<
    SelectedWarehouseStockItem[]
  >([]);
  const [selectedRetailShop, setSelectedRetailShop] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<{
    retailShop: string;
    items: string;
  }>({ retailShop: "", items: "" });

  const [filteredItems, setFilteredItems] = useState<
    SelectedWarehouseStockItem[]
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
        ({ warehouseStock }) =>
          warehouseStock.product.name.toLowerCase().includes(query) ||
          warehouseStock.product.serialNumber.includes(query)
      )
    );
  };

  const handleTransferItems = async () => {
    if (selectedItems.length === 0) {
      setFormError({ retailShop: "", items: "Select at least one item" });
      return;
    }
    if (!selectedRetailShop) {
      setFormError({
        items: "",
        retailShop: "Select a retail shop",
      });
      return;
    }
    setFormError({
      items: "",
      retailShop: "",
    });
    await transferGoodsToRetailshop({
      variables: {
        data: {
          goods: selectedItems.map((item) => ({
            productId: item.warehouseStock.product.id,
            quantity: item.selectedQuantity,
            // price: item.warehouseStock.product.activePrice.price,
          })),
          retailShopId: selectedRetailShop!,
          sourceWarehouseId: warehouseId,
          transferType: TransferType.WarehouseToRetailShop,
        },
      },
      refetchQueries: [
        {
          query: WAREHOUSE_STOCKS,
          variables: {
            filterWarehouseStockInput: {
              warehouse: {
                id: (sessionData?.user as any).warehouseId || "",
              },
            },
          },
        },
        {
          query: GET_TOTAL_VALUATION_OF_WAREHOUSE,
          variables: {
            warehouseId: warehouseId,
          },
        },
        {
          query: WAREHOUSE_TRANSACTION_HISTORY,
          variables: {
            warehouseId: warehouseId,
          },
        },
      ],
      onCompleted: (data) => {
        setSelectedItems([]);
        setSelectedRetailShop(null);
        showAlert("transferred a", "stock");
      },
    });
  };

  const [open, setOpen] = useState(false);

  const handleAddItem = (warehouseStock: StockItem, quantity: number) => {
    const selectedStockItem: SelectedWarehouseStockItem = {
      warehouseStock: warehouseStock,
      selectedQuantity: quantity,
    };
    setSelectedItems((prev) => [...selectedItems, selectedStockItem]);
  };
  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.filter((stock) => stock.warehouseStock.product.id !== id)
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
                  <Link component={NextLink} href={"/dashboard"}>
                    Dashboard
                  </Link>
                  <Link component={NextLink} href={"/transfer-items"}>
                    Transfer Items
                  </Link>
                  <Typography>List</Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>

            <Grid container spacing={2}>
              <Grid item sm={12} md={8}>
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
                  <ItemsSummaryTable
                    handleRemoveItem={handleRemoveItem}
                    filteredItems={filteredItems}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                </Card>
              </Grid>
              <Grid item sm={12} md={4}>
                <Card>
                  <CardHeader title="Retail Shops" />
                  <RetailShopsList
                    selectedRetailShop={selectedRetailShop}
                    setSelectedRetailShop={setSelectedRetailShop}
                  />
                </Card>
              </Grid>
            </Grid>
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
        warehouseStocks={warehouseStocks}
        selectedItemsId={selectedItems.map(
          (item) => item.warehouseStock.product.id
        )}
        handleAddItem={handleAddItem}
        open={open}
        setOpen={setOpen}
        warehouseId={warehouseId}
      />
    </>
  );
};

export default Page;
