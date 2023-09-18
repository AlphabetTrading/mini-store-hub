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
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ManagersListSearch from "@/components/retail-shop-managers/managers-list-search";
import ManagersListTable from "@/components/retail-shop-managers/managers-list-table";
import {
  RETAIL_SHOP_MANAGERS,
  RetailShopManagersData,
} from "@/graphql/retail-shop-managers/queries";
import StateHandler from "@/components/state-handler";
import { User, UserRole } from "../../../../types/user";
import Pagination from "@/components/Pagination";
import { USERS, UsersData, UsersVars } from "@/graphql/users/queries";

type Props = {};

const Page = (props: Props) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, loading, error } = useQuery<UsersData, UsersVars>(USERS, {
    variables: {
      filterUserInput: {
        firstName: {
          contains: query,
        },
        lastName: {
          contains: query,
        },
        phone: {
          contains: query,
        },
        role: UserRole.RETAIL_SHOP_MANAGER,
      },
      paginationInput: {
        take: rowsPerPage,
        skip: page * rowsPerPage,
      },
      orderBy: {
        updatedAt: "desc",
      },
    },
    fetchPolicy: "cache-and-network",
    // onCompleted: (data) => {
    //   setFilteredData(data.users.items);
    // },
  });

  // const filterBySearch = useCallback(() => {
  //   var updatedList = data ? [...data.users.items] : [];
  //   if (query && data?.users.items) {
  //     updatedList = data.users.items.filter((item: User) => {
  //       return (
  //         item.firstName?.toLowerCase().includes(query.toLowerCase()) ||
  //         item.lastName?.toLowerCase().includes(query.toLowerCase())
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
              <Typography variant="h4">Retail Shop Managers</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/retail-shop-managers"}>
                  Retail Shop Managers
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
          </Stack>
          <ManagersListSearch query={query} setQuery={setQuery} />
          <StateHandler
            loading={loading}
            error={error}
            empty={data?.users.items.length === 0}
          >
            <Card>
              <ManagersListTable retailShopManagers={data?.users.items || []} />
              <Pagination
                meta={data?.users.meta!}
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
