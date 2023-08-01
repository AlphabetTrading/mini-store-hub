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
import AddIcon from "@mui/icons-material/Add";
import ItemListTable from "@/components/stock/stock-list-table";
import {
    PRODUCTS,
  ProductsData,
} from "@/graphql/products/queries";
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ItemListSearch from "@/components/stock/stock-list-search";
// import { useQuery } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";
import ProductsListSearch from "@/components/products/products-list-search";
import ProductsListTable from "@/components/products/products-list-table";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();
  const {data,error,loading} = useQuery<ProductsData>(PRODUCTS,{
    fetchPolicy:"cache-and-network"
  })


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
                <Link component={NextLink} href={"/dashboard"}>
                  Stock
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
          {loading ? (
            <CircularProgress />
          ) : !data || error ? (
            <Typography variant="h4">
              Failed to fetch {JSON.stringify(error)}
            </Typography>
          ) : (
            <Card>
              <ProductsListSearch />
              <ProductsListTable products={data.products.items} />
            </Card>
          )}
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
