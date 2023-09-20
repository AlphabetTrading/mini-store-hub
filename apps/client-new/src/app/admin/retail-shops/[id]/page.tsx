"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Link,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Button,
  SvgIcon,
  Alert,
  AlertTitle,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Card,
  Grid,
} from "@mui/material";
import NextLink from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RetailShopBasicDetails from "@/components/retail-shops/retail-shop-basic-details";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  RETAIL_SHOP,
  RETAIL_SHOP_STOCK,
  RetailShopData,
  RetailShopStockData,
  RetailShopStockVars,
  RetailShopVars,
} from "@/graphql/retail-shops/queries";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";
import {
  DeactivateRetailShopData,
  DeactivateRetailShopVars,
  DEACTIVATE_RETAIL_SHOP,
  ACTIVATE_RETAIL_SHOP,
  ActivateRetailShopData,
  ActivateRetailShopVars,
} from "@/graphql/retail-shops/mutations";
import StateHandler from "@/components/state-handler";
import StockListTable from "@/components/stock/stock-list-table";
import Pagination from "@/components/Pagination";
import RetailShopSalesTable from "@/components/retail-shops/retail-shop-sales-table";
import RetailShopInsights from "@/components/retail-shops/retail-shop-insights";
import RetailShopLowStock from "@/components/retail-shops/retail-shop-low-stock";

type Props = {
  params: {
    id: string;
  };
};
const tabs = [
  { label: "Details", value: "details" },
  { label: "Stock", value: "stock" },
  { label: "Sales", value: "sales" },
  { label: "Insights", value: "insights" },
];

const Page = ({ params }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    query: "",
    filter: "updatedAt|desc",
  });
  const [currentTab, setCurrentTab] = useState("details");
  const handleTabsChange = useCallback((event: any, value: string) => {
    setCurrentTab(value);
  }, []);
  const [
    deactivateRetailShop,
    {
      error: deactivateError,
      loading: deactivateLoading,
      reset: deactivateReset,
    },
  ] = useMutation<DeactivateRetailShopData, DeactivateRetailShopVars>(
    DEACTIVATE_RETAIL_SHOP
  );
  const [
    activateRetailShop,
    { error: activateError, loading: activateLoading, reset: activateReset },
  ] = useMutation<ActivateRetailShopData, ActivateRetailShopVars>(
    ACTIVATE_RETAIL_SHOP
  );
  const { data, error, loading } = useQuery<RetailShopData, RetailShopVars>(
    RETAIL_SHOP,
    {
      variables: {
        retailShopId: params.id,
      },
    }
  );
  const [
    getStock,
    { data: stockData, error: stockError, loading: stockLoading },
  ] = useLazyQuery<RetailShopStockData, RetailShopStockVars>(RETAIL_SHOP_STOCK);
  useEffect(() => {
    if (currentTab === "stock") {
      getStock({
        variables: {
          filterRetailShopStockInput: {
            retailShopId: params.id,
          },
          paginationInput: {
            skip: page * rowsPerPage,
            take: rowsPerPage,
          },
        },
      });
    }
  }, [currentTab]);
  const handleDeactivateRetailShop = async () => {
    await deactivateRetailShop({
      variables: {
        deactivateRetailShopId: params.id,
      },
      onCompleted(data, clientOptions) {
        showAlert("deactivated a", "retail shop");
      },
      update(cache, { data }) {
        const existingRetailShop: RetailShopData = cache.readQuery<
          RetailShopData,
          RetailShopVars
        >({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
        }) as RetailShopData;

        const newRetailShop: RetailShopData = {
          ...existingRetailShop,
          retailShop: {
            ...existingRetailShop?.retailShop,
            status: data?.status,
          },
        };
        cache.writeQuery<RetailShopData>({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
          data: {
            retailShop: newRetailShop.retailShop,
          },
        });
      },
      onError(error) {
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  const handleActivateRetailShop = async () => {
    await activateRetailShop({
      variables: {
        activateRetailShopId: params.id,
      },
      onCompleted(data, clientOptions) {
        showAlert("activated a", "retail shop");
      },
      update(cache, { data }) {
        const existingRetailShop: RetailShopData = cache.readQuery<
          RetailShopData,
          RetailShopVars
        >({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
        }) as RetailShopData;

        const newRetailShop: RetailShopData = {
          ...existingRetailShop,
          retailShop: {
            ...existingRetailShop?.retailShop,
            status: data?.status,
          },
        };
        cache.writeQuery<RetailShopData>({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
          data: {
            retailShop: newRetailShop.retailShop,
          },
        });
      },
      onError(error) {
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        )}

        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={1}>
              <Typography variant="h4">Retail Shop</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/retail-shops"}>
                  Retail Shops
                </Link>
                <Typography>Detail</Typography>
              </Breadcrumbs>
            </Stack>
            {data && (
              <Stack alignItems="center" direction="row" spacing={2}>
                <Button
                  variant={"outlined"}
                  color={data?.retailShop.status ? "error" : "primary"}
                  disabled={deactivateLoading || activateLoading}
                  // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
                  onClick={() =>
                    data?.retailShop.status
                      ? handleDeactivateRetailShop()
                      : handleActivateRetailShop()
                  }
                >
                  {(deactivateLoading || activateLoading) && (
                    <CircularProgress
                      size={16}
                      sx={{ mr: 1, color: "neutral.500" }}
                    />
                  )}
                  {data?.retailShop.status ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="contained"
                  component={NextLink}
                  endIcon={<SvgIcon>{<EditIcon />}</SvgIcon>}
                  href={`/admin/retail-shops/${params.id}/edit`}
                >
                  Edit
                </Button>
              </Stack>
            )}
          </Stack>
          <div>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
          </div>
          {currentTab === "details" && (
            <StateHandler loading={loading} error={error} empty={false}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {data && (
                    <RetailShopBasicDetails retailShop={data?.retailShop} />
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <RetailShopLowStock retailShopId={params.id} />
                </Grid>
              </Grid>
            </StateHandler>
          )}
          {currentTab === "stock" && (
            <StateHandler
              error={stockError}
              loading={stockLoading}
              empty={
                stockData?.retailShopStockByRetailShopId.items.length === 0
              }
            >
              <Card>
                <StockListTable
                  warehouseStocks={
                    stockData?.retailShopStockByRetailShopId.items || []
                  }
                />
                <Pagination
                  meta={stockData?.retailShopStockByRetailShopId.meta}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                />
              </Card>
            </StateHandler>
          )}
          {currentTab === "sales" && (
            <RetailShopSalesTable retailShopId={params.id} />
          )}

          {currentTab === "insights" && (
            <RetailShopInsights retailShopId={params.id} />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
