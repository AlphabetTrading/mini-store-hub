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
import React from "react";
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

type Props = {};

const Page = (props: Props) => {
  const { data, loading, error } =
    useQuery<RetailShopManagersData>(RETAIL_SHOP_MANAGERS);

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
          <StateHandler
            loading={loading}
            error={error}
            empty={data?.retailShopManagers.length === 0}
          >
            <Card>
              <ManagersListSearch />
              <ManagersListTable
                retailShopManagers={data?.retailShopManagers || []}
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
