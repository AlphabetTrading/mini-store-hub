"use client";
import TransactionHistoryTable from "@/components/transaction-history/transaction-history-table";
import WarehouseBasicDetails from "@/components/warehouses/warehouse-basic-details";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Button,
  Link,
  Breadcrumbs,
  CircularProgress,
  Alert,
  AlertTitle,
  Divider,
  Tab,
  Tabs,
  Card,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  WAREHOUSE,
  WarehouseData,
  WarehouseVars,
} from "@/graphql/warehouses/queries";
import { showAlert } from "@/helpers/showAlert";
import ProductsListSearch from "@/components/products/products-list-search";
import StateHandler from "@/components/state-handler";
import StockListTable from "@/components/stock/stock-list-table";
import {
  WarehouseStockData,
  WarehouseStockVars,
  WAREHOUSE_STOCK,
} from "@/graphql/products/queries";
import Pagination from "@/components/Pagination";
import {
  ACTIVATE_WAREHOUSE,
  ActivateWarehouseData,
  ActivateWarehouseVars,
  DEACTIVATE_WAREHOUSE,
  DeactivateWarehouseData,
  DeactivateWarehouseVars,
} from "@/graphql/warehouses/mutations";

type Props = {
  params: {
    id: string;
  };
};

const tabs = [
  { label: "Details", value: "details" },
  { label: "Stock", value: "stock" },
  { label: "Transaction History", value: "transaction" },
];
type OrderBySelectorReturnType =
  | { product: { name: string } }
  | { product: { category: { name: string } } }
  | undefined;

const OrderBySelector = (filter: string): OrderBySelectorReturnType => {
  const filterType = filter.split("|")[0];
  switch (filterType) {
    case "name":
      return {
        product: {
          name: filter.split("|")[1],
        },
      };
    case "categoryName":
      return {
        product: {
          category: {
            name: filter.split("|")[1],
          },
        },
      };
    default:
      return undefined;
  }
};

const Page = ({ params }: Props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    query: "",
    filter: "name|asc",
  });
  const { data, error, loading } = useQuery<WarehouseData, WarehouseVars>(
    WAREHOUSE,
    {
      variables: {
        warehouseId: params.id,
      },
    }
  );
  const [
    deactivateWarehouse,
    {
      error: deactivateError,
      loading: deactivateLoading,
      reset: deactivateReset,
    },
  ] = useMutation<DeactivateWarehouseData, DeactivateWarehouseVars>(
    DEACTIVATE_WAREHOUSE
  );
  const [
    activateWarehouse,
    { error: activateError, loading: activateLoading, reset: activateReset },
  ] = useMutation<ActivateWarehouseData, ActivateWarehouseVars>(
    ACTIVATE_WAREHOUSE
  );

  const [
    getWarehouseData,
    { data: warehouseData, loading: warehouseLoading, error: warehouseError },
  ] = useLazyQuery<WarehouseStockData, WarehouseStockVars>(WAREHOUSE_STOCK, {
    variables: {
      filterWarehouseStockInput: {
        warehouse: {
          id: params.id,
        },
      },
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
      orderBy: OrderBySelector(filter.filter),
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      getWarehouseData();
    }, 300);
    return () => clearTimeout(timeout);
  }, [filter, page, rowsPerPage, params.id, getWarehouseData]);

  const handleDeactivate = async () => {
    await deactivateWarehouse({
      variables: {
        deactivateWarehouseId: params.id,
      },
      update(cache, { data }) {
        const existingWarehouse: WarehouseData = cache.readQuery<
          WarehouseData,
          WarehouseVars
        >({
          query: WAREHOUSE,
          variables: {
            warehouseId: params.id,
          },
        }) as WarehouseData;

        const newWarehouse: WarehouseData = {
          ...existingWarehouse,
          warehouse: {
            ...existingWarehouse?.warehouse,
            status: data?.deactivateWarehouse.status,
          },
        };
        cache.writeQuery<WarehouseData>({
          query: WAREHOUSE,
          variables: {
            retailShopId: params.id,
          },
          data: {
            warehouse: newWarehouse.warehouse,
          },
        });
      },
      onCompleted(data, clientOptions) {
        console.log(data);
        showAlert("deactivated a", "warehouse");
      },
      onError(error) {
        console.log(error);
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  const handleActivate = async () => {
    await activateWarehouse({
      variables: {
        activateWarehouseId: params.id,
      },
      update(cache, { data }) {
        const existingWarehouse: WarehouseData = cache.readQuery<
          WarehouseData,
          WarehouseVars
        >({
          query: WAREHOUSE,
          variables: {
            warehouseId: params.id,
          },
        }) as WarehouseData;

        const newWarehouse: WarehouseData = {
          ...existingWarehouse,
          warehouse: {
            ...existingWarehouse?.warehouse,
            status: data?.activateWarehouse.status,
          },
        };
        cache.writeQuery<WarehouseData>({
          query: WAREHOUSE,
          variables: {
            retailShopId: params.id,
          },
          data: {
            warehouse: newWarehouse.warehouse,
          },
        });
      },
      onCompleted(data, clientOptions) {
        console.log(data);

        showAlert("activated a", "warehouse");
      },
      onError(error) {
        console.log(error);
        setTimeout(() => {
          activateReset();
        }, 3000);
      },
    });
  };

  const handleTabsChange = useCallback((event: any, value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {(activateError || deactivateError) && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {activateError?.message || deactivateError?.message}
          </Alert>
        )}
        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={1}>
              <Typography variant="h4">Warehouse</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/warehouses"}>
                  Warehouses
                </Link>
                <Typography>Detail</Typography>
              </Breadcrumbs>
            </Stack>
            {data && (
              <Stack alignItems="center" direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color={data.warehouse.status ? "error" : "primary"}
                  disabled={deactivateLoading || activateLoading}
                  // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
                  onClick={() =>
                    data.warehouse.status
                      ? handleDeactivate()
                      : handleActivate()
                  }
                >
                  {(deactivateLoading || activateLoading) && (
                    <CircularProgress
                      size={16}
                      sx={{ mr: 1, color: "neutral.500" }}
                    />
                  )}
                  {data.warehouse.status ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="contained"
                  component={NextLink}
                  endIcon={<SvgIcon>{<EditIcon />}</SvgIcon>}
                  href={`/admin/warehouses/${params.id}/edit`}
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
          {currentTab === tabs[0].value && (
            <StateHandler loading={loading} error={error}>
              {data && <WarehouseBasicDetails warehouse={data?.warehouse} />}{" "}
            </StateHandler>
          )}
          {currentTab === tabs[1].value && (
            <Stack justifyItems="end">
              <Stack direction="row" justifyContent="start">
                <Button
                  component={NextLink}
                  variant="contained"
                  href={`/admin/warehouses/${params.id}/add`}
                >
                  Process Incoming Items
                </Button>
              </Stack>
              <ProductsListSearch filter={filter} setFilter={setFilter} />
              <StateHandler
                error={warehouseError}
                loading={warehouseLoading}
                empty={warehouseData?.warehouseStocks.items.length == 0}
              >
                <Card>
                  <StockListTable
                    warehouseStocks={warehouseData?.warehouseStocks.items || []}
                  />
                  <Pagination
                    meta={warehouseData?.warehouseStocks.meta}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                  />
                </Card>
              </StateHandler>
            </Stack>
          )}
          {currentTab === tabs[2].value && (
            <TransactionHistoryTable warehouseId={params.id} />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
