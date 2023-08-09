"use client";
import TransactionHistoryTable from "@/components/transaction-history/transaction-history-table";
import WarehouseBasicDetails from "@/components/warehouses/warehouse-basic-details";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Button,
  Link,
  Breadcrumbs,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={1}>
              <Typography variant="h4">Warehouse</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/warehouses"}>
                  Warehouse
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Button
                variant="contained"
                component={NextLink}
                endIcon={<SvgIcon>{<EditIcon />}</SvgIcon>}
                href={`/admin/warehouses/${params.id}/edit`}
              >
                Edit
              </Button>
            </Stack>
          </Stack>
          <WarehouseBasicDetails warehouseId={params.id} />
          <TransactionHistoryTable warehouseId={params.id} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
