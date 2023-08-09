"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Button,
  Link,
  CardContent,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NextLink from "next/link";
import React from "react";
import { WAREHOUSES, WarehousesData } from "@/graphql/warehouses/queries";
import { useQuery } from "@apollo/client";
import WarehousesListTable from "@/components/warehouses/warehouses-list-table";
import StateHandler from "@/components/state-handler";

type Props = {};

const Page = (props: Props) => {
  const { data, loading, error } = useQuery<WarehousesData>(WAREHOUSES, {
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
              <Typography variant="h4">Warehouses</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/warehouses"}>
                  Warehouses
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={NextLink}
              href="/admin/warehouses/create"
            >
              Add Warehouse
            </Button>
          </Stack>
          <Card>
            <StateHandler
              loading={loading}
              error={error}
              empty={data?.warehouses?.items.length === 0}
            >
              {data && (
                <WarehousesListTable warehouses={data!.warehouses.items} />
              )}
            </StateHandler>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
