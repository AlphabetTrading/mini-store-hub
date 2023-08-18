"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import RetailShopsListTable from "@/components/retail-shops/retail-shops-list-table";
import StateHandler from "@/components/state-handler";
import { RetailShopsData, RETAIL_SHOPS } from "@/graphql/retail-shops/queries";
import { useQuery } from "@apollo/client";
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
import React from "react";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";

type Props = {};

const Page = (props: Props) => {
  const { data, loading, error } = useQuery<RetailShopsData>(RETAIL_SHOPS, {
    fetchPolicy: "cache-and-network",
  });

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
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/retail-shops"}>
                  Retail Shops
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Button
              component={NextLink}
              href={"/admin/retail-shops/create"}
              startIcon={<AddIcon />}
            >
              Create Retail Shop
            </Button>
          </Stack>
          <StateHandler
            loading={loading}
            error={error}
            empty={data?.retailShops.items.length === 0}
          >
            <Card>
              <RetailShopsListTable
                retailShops={data?.retailShops.items || []}
              />
            </Card>
          </StateHandler>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
