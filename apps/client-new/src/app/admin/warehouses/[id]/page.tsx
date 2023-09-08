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
import {
  DELETE_WAREHOUSE,
  DeleteWarehouseVars,
} from "@/graphql/warehouses/mutations";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { WAREHOUSES } from "@/graphql/warehouses/queries";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";
import ProductsListSearch from "@/components/products/products-list-search";
import StateHandler from "@/components/state-handler";
import StockListTable from "@/components/stock/stock-list-table";
import {
  WarehouseStockData,
  WarehouseStockVars,
  WAREHOUSE_STOCK,
} from "@/graphql/products/queries";
import { OrderBySelector } from "@/app/(warehouse-manager)/stock/page";
import Pagination from "@/components/Pagination";

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

const Page = ({ params }: Props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const [deleteWarehouse, { loading, error, reset }] = useMutation<
    {},
    DeleteWarehouseVars
  >(DELETE_WAREHOUSE);
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    query: "",
    filter: "name|asc",
  });

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

  const handleDelete = async () => {
    await deleteWarehouse({
      variables: {
        deleteWarehouseId: params.id,
      },
      refetchQueries: [{ query: WAREHOUSES }],
      onCompleted(data, clientOptions) {
        showAlert("deleted a", "warehouse");
        router.replace("/admin/warehouses");
      },
      onError(error) {
        setTimeout(() => {
          reset();
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
            <Stack alignItems="center" direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="error"
                disabled={loading}
                // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
                onClick={() => handleDelete()}
              >
                {loading && (
                  <CircularProgress
                    size={16}
                    sx={{ mr: 1, color: "neutral.500" }}
                  />
                )}
                Delete
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
            <WarehouseBasicDetails warehouseId={params.id} />
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
                error={error}
                loading={loading}
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
