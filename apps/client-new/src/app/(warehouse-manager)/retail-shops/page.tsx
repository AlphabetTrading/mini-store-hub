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
import React, { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  RETAIL_SHOPS,
  RetailShopsData,
  RetailShopsVars,
} from "@/graphql/retail-shops/queries";
import RetailShopsListSearch from "@/components/retail-shops/retail-shops-list-search";
import RetailShopsListTable from "@/components/retail-shops/retail-shops-list-table";
import StateHandler from "@/components/state-handler";
import { User } from "next-auth";
import { RetailShop } from "../../../../types/retail-shop";
import Pagination from "@/components/Pagination";

type Props = {};

const Page = (props: Props) => {
  const [query, setQuery] = useState("");

  // const [filteredData, setFilteredData] = useState<RetailShop[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, loading, error } = useQuery<RetailShopsData, RetailShopsVars>(
    RETAIL_SHOPS,
    {
      variables: {
        filterRetailShopInput: {
          name: {
            contains: query,
          },
        },
        paginationInput: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
      fetchPolicy: "cache-and-network",
      // onCompleted: (data) => {
      //   setFilteredData(data.retailShops.items);
      // },
    }
  );

  console.log(data?.retailShops);
  // const filterBySearch = useCallback(() => {
  //   var updatedList = data ? [...data.retailShops.items] : [];
  //   if (query && data?.retailShops) {
  //     updatedList = data.retailShops.items.filter((item: RetailShop) => {
  //       return (
  //         item.name?.toLowerCase().includes(query.toLowerCase()) ||
  //         item.retailShopManager?.firstName
  //           ?.toLowerCase()
  //           .includes(query.toLowerCase()) ||
  //         item.retailShopManager?.lastName
  //           ?.toLowerCase()
  //           .includes(query.toLowerCase())
  //       );
  //     });
  //   }
  //   setFilteredData(updatedList);
  // }, [data, query]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     filterBySearch();
  //   }, 300);
  //   return () => clearTimeout(timeout);
  // }, [filterBySearch]);

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
              <Typography variant="h4">Retail Shops</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/retail-shops"}>
                  Retail Shops
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
          </Stack>

          <RetailShopsListSearch query={query} setQuery={setQuery} />
          <StateHandler
            loading={loading}
            error={error}
            empty={data?.retailShops.items.length === 0}
          >
            <Card>
              <RetailShopsListTable
                retailShops={data?.retailShops.items || []}
              />
              <Pagination
                meta={data?.retailShops.meta!}
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
