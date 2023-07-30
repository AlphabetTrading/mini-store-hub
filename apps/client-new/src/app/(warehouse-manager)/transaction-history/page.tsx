import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import TransactionHistoryTable from "@/components/transaction-history/transaction-history-table";
import {
  Link,
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  CardHeader,
  Card,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";

type Props = {};

const Page = (props: Props) => {
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
              <Typography variant="h4">Transaction History</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/transaction-history"}>
                  Transfer Items
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
          </Stack>
          <Card>
            <CardHeader title="Latest Transactions" />
            <TransactionHistoryTable/>

          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
