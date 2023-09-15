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

import { useMutation } from "@apollo/client";
import { WAREHOUSE_STOCK } from "@/graphql/products/queries";
import TransferItemsDrawer from "@/components/modals/transfer-items-drawer";
import { StockItem } from "../../../../types/product";
import RetailShopsList from "@/components/transfer-items/retail-shops-list";
import {
  TRANSFER_GOODS,
  TransferGoodsData,
  TransferGoodsVars,
} from "@/graphql/transfer-goods/mutations";
import { useSession } from "next-auth/react";
import { TransferType } from "../../../../types/transaction-history";
import { showAlert } from "@/helpers/showAlert";
import SearchIcon from "@mui/icons-material/Search";
import { GET_TOTAL_VALUATION_OF_WAREHOUSE } from "@/graphql/warehouse-managers/queries";
import { WAREHOUSE_TRANSACTION_HISTORY } from "@/graphql/transfer-goods/queries";

type Props = {};

export interface SelectedWarehouseItem {
  warehouseStock: StockItem;
  selectedQuantity: number;
}

const Page = (props: Props) => {
  const [transferGoodsToRetailshop, { data, error, loading }] = useMutation<
    TransferGoodsData,
    TransferGoodsVars
  >(TRANSFER_GOODS);

  const { data: sessionData } = useSession();

  const [selectedItems, setSelectedItems] = useState<SelectedWarehouseItem[]>(
    []
  );
  const [selectedRetailShop, setSelectedRetailShop] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<{
    retailShop: string;
    items: string;
  }>({ retailShop: "", items: "" });

  const [filteredItems, setFilteredItems] = useState<SelectedWarehouseItem[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const warehouseId = (sessionData?.user as any).warehouseId || "";

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
          query: WAREHOUSE_STOCK,
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
    const selectedStockItem: SelectedWarehouseItem = {
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
        selectedItemsId={selectedItems.map(
          (item) => item.warehouseStock.product.id
        )}
        handleAddItem={handleAddItem}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Page;
