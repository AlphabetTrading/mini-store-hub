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
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import { RETAIL_SHOPS, RetailShopsData } from "@/graphql/retail-shops/queries";
import RetailShopsListSearch from "@/components/retail-shops/retail-shops-list-search";
import RetailShopsListTable from "@/components/retail-shops/retail-shops-list-table";
import StateHandler from "@/components/state-handler";

type Props = {};

const Page = (props: Props) => {
  const { data, loading, error } = useQuery<RetailShopsData>(RETAIL_SHOPS);

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

          <StateHandler
            loading={loading}
            error={error}
            empty={data?.retailShops.items.length === 0}
          >
            <Card>
              <RetailShopsListSearch />
              <RetailShopsListTable
                retailShops={data?.retailShops.items || []}
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
