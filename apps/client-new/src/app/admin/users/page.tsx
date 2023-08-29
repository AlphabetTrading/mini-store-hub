"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
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
import React, { useState } from "react";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { UsersData, USERS } from "@/graphql/users/queries";
import { useQuery } from "@apollo/client";
import UsersListTable from "@/components/users/users-list-table";
import StateHandler from "@/components/state-handler";
import Pagination from "@/components/Pagination";

type Props = {};

const Page = (props: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, loading } = useQuery<UsersData>(USERS, {
    variables: {
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
    },
    // fetchPolicy: "cache-and-network",
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
              <Typography variant="h4">Users</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/users"}>
                  Users
                </Link>
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={NextLink}
              href="/admin/users/register"
            >
              Register User
            </Button>
          </Stack>
          {loading ? (
            <CircularProgress />
          ) : !data || error ? (
            <Typography variant="h4">
              Failed to fetch {JSON.stringify(error)}
            </Typography>
          ) : (
            <Card>
              <StateHandler
                empty={data?.users.items.length === 0}
                error={error}
                loading={loading}
              >
                <UsersListTable users={data?.users.items} />
                <Pagination
                  meta={data?.users.meta!}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                />
              </StateHandler>
            </Card>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
