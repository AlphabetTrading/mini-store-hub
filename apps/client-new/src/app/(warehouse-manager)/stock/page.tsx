"use client";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import AddIcon from "@mui/icons-material/Add";
import {
  WAREHOUSE_STOCK,
  WarehouseStockData,
  WarehouseStockVars,
} from "@/graphql/products/queries";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";
import ProductsListSearch from "@/components/products/products-list-search";
import Pagination from "@/components/Pagination";
import StateHandler from "@/components/state-handler";
import StockListTable from "@/components/stock/stock-list-table";

type Props = {};

export const OrderBySelector = (filter: string) => {
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
  }
};

const Page = (props: Props) => {
  const [filter, setFilter] = useState({
    query: "",
    filter: "name|asc",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: sessionData } = useSession();
  const warehouseId = (sessionData?.user as any).warehouseId || "";
  const { data, loading, error, refetch } = useQuery<
    WarehouseStockData,
    WarehouseStockVars
  >(WAREHOUSE_STOCK, {
    variables: {
      filterWarehouseStockInput: {
        warehouse: {
          id: warehouseId,
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
      refetch({
        filterWarehouseStockInput: {
          warehouse: {
            id: warehouseId,
          },
          product: {
            name: {
              contains: filter.query,
            },
            serialNumber: {
              contains: filter.query,
            },
          },
        },
        paginationInput: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
        },
        orderBy: OrderBySelector(filter.filter),
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [filter, page, refetch, rowsPerPage, warehouseId]);

  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={1}>
              <Typography variant="h4">Stock</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/stock"}>
                  Stock
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Stack>
              <Button
                variant="contained"
                component={NextLink}
                href={"/stock/add"}
                startIcon={<AddIcon />}
              >
                Add New Items
              </Button>
            </Stack>
          </Stack>
          <ProductsListSearch filter={filter} setFilter={setFilter} />
          <StateHandler
            error={error}
            loading={loading}
            empty={data?.warehouseStocks.items.length == 0}
          >
            <Card>
              <StockListTable
                warehouseStocks={data?.warehouseStocks.items || []}
              />
              <Pagination
                meta={data?.warehouseStocks.meta}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </Card>
          </StateHandler>
          {/* <Card>
            <ItemListSearch/>
            <ItemListTable warehouseItemsData={data!} />
          </Card> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
