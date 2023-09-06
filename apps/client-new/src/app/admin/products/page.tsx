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
import { PRODUCTS, ProductsData } from "@/graphql/products/queries";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";
import ProductsListSearch from "@/components/products/products-list-search";
import ProductsListTable from "@/components/products/products-list-table";
import Pagination from "@/components/Pagination";
import StateHandler from "@/components/state-handler";

type Props = {};

const OrderBySelector = (filter: string) => {
  const filterType = filter.split("|")[0];
  switch (filterType) {
    case "name":
      return {
        name: filter.split("|")[1],
      };
    case "categoryName":
      return {
        category: {
          name: filter.split("|")[1],
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
  const { data, error, loading, refetch } = useQuery<ProductsData>(PRODUCTS, {
    variables: {
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
      orderBy: OrderBySelector(filter.filter),
    },
    // notifyOnNetworkStatusChange: true,

    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch({
        filterProductInput: {
          name: {
            contains: filter.query,
          },
          serialNumber: {
            contains: filter.query,
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
  }, [filter, page, refetch, rowsPerPage]);

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
              <Typography variant="h4">Products</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/products"}>
                  Products
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Stack>
              <Button
                variant="contained"
                component={NextLink}
                href={"/admin/products/create"}
                startIcon={<AddIcon />}
              >
                Create Product
              </Button>
            </Stack>
          </Stack>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ProductsListSearch filter={filter} setFilter={setFilter} />
            <StateHandler
              empty={data?.products.items.length === 0}
              error={error}
              loading={loading}
            >
              <ProductsListTable products={data?.products.items || []} />
              <Pagination
                meta={data?.products.meta}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </StateHandler>
          </Card>
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
