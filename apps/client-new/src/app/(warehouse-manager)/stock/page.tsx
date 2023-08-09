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
  WAREHOUSE_STOCK,
  WarehouseStockData,
  WarehouseStockVars,
} from "@/graphql/products/queries";
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ItemListSearch from "@/components/stock/stock-list-search";
// import { useQuery } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();

  const { data, loading, error, refetch } = useQuery<
    WarehouseStockData,
    WarehouseStockVars
  >(WAREHOUSE_STOCK, {
    variables: {
      warehouseId: ((sessionData?.user)as any).warehouseId || "",
    },
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
                href={"/stock/add"}
                startIcon={<AddIcon />}
              >
                Add New Items
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
              <ItemListSearch />
              <ItemListTable warehouseStockData={data} />
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
