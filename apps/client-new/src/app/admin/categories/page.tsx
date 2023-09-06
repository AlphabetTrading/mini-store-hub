"use client";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CircularProgress,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import AddIcon from "@mui/icons-material/Add";
import CategoriesListSearch from "@/components/categories/categories-list-search";
import CategoriesListTable from "@/components/categories/categories-list-table";
import { ProductsData, PRODUCTS } from "@/graphql/products/queries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { CATEGORIES, CategoriesData } from "@/graphql/categories/queries";
import Pagination from "@/components/Pagination";
import StateHandler from "@/components/state-handler";

type Props = {};

const Page = (props: Props) => {
  const [filter, setFilter] = useState({
    query: "",
    filter: "name|asc",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: sessionData } = useSession();
  const { data, error, loading, refetch } = useQuery<CategoriesData>(CATEGORIES, {
    variables: {
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
      orderBy: {
        name: filter.filter.split("|")[1],
      },
    },
    // fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch({
        filterCategoryInput: {
          name: {
            contains: filter.query,
          },
          description: {
            contains: filter.query,
          },
        },
        paginationInput: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
        },
        orderBy: {
          name: filter.filter.split("|")[1],
        },
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
              <Typography variant="h4">Categories</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/categories"}>
                  Categories
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Stack>
              <Button
                variant="contained"
                component={NextLink}
                href={"/admin/categories/create"}
                startIcon={<AddIcon />}
              >
                Create Category
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
            <CategoriesListSearch filter={filter} setFilter={setFilter} />
            <StateHandler
              empty={data?.categories.items.length===0}
              error={error}
              loading={loading}
            >
              <>
                <CategoriesListTable categories={data?.categories.items||[]} />
                <Pagination
                  meta={data?.categories.meta}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                />
              </>
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
