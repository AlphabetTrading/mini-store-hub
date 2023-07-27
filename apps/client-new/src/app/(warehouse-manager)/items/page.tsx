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
import ItemListTable from "@/components/items/item-list-table";
import {
  WAREHOUSE_ITEMS,
  WarehouseItemsData,
  WarehouseItemsVars,
} from "@/graphql/items/queries";
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ItemListSearch from "@/components/items/item-list-search";
// import { useQuery } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession } from "next-auth/react";

type Props = {};

const page = (props: Props) => {
  
  const {data:sessionData} = useSession();

  const { data, loading, error,refetch } = useQuery<
    WarehouseItemsData,
    WarehouseItemsVars
  >(WAREHOUSE_ITEMS, {
    variables: {
      warehouseId: "clki1bbrx000srlwgvx7jzw1i",
    },
  
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
              <Typography variant="h4">Items</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/dashboard"}>
                  Items
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Stack>
              <Button
                variant="contained"
                component={NextLink}
                href={"/items/add"}
                startIcon={<AddIcon />}
              >
                Add Incoming Items
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
              <ItemListTable warehouseItemsData={data} />
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

export default page;
