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
  const handleTransferItems = async () => {
    await transferGoodsToRetailshop({
      variables: {
        data: {
          goods: selectedItems.map((item) => ({
            productId: item.warehouseStock.product.id,
            quantity: item.selectedQuantity,
            // price: item.warehouseStock.product.activePrice.price,
          })),
          retailShopId: selectedRetailShop!,
          sourceWarehouseId: (sessionData?.user as any).warehouseId || "",
          transferType: TransferType.WarehouseToRetailShop,
        },
      },
      refetchQueries: [WAREHOUSE_STOCK],
      onCompleted: (data) => {
        setSelectedItems([]);
        setSelectedRetailShop(null);
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
              <Grid item xs={12} md={8}>
                <Card>
                  <CardHeader
                    action={
                      <Button variant="contained" onClick={() => setOpen(true)}>
                        Add
                      </Button>
                    }
                    title="Products Summary"
                  />
                  <ItemsSummaryTable
                    handleRemoveItem={handleRemoveItem}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
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
            onClick={() => handleTransferItems()}
          >
             {loading && <CircularProgress size={16} sx={{mr:1, color:"neutral.500"} }/>}
            Transfer Items
          </Button>
         
        </Container>
      </Box>
      <TransferItemsDrawer
      selectedItemsId={selectedItems.map((item) => item.warehouseStock.product.id)}
        handleAddItem={handleAddItem}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Page;
