"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
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
import { UsersData, USERS } from "@/graphql/users/queries";
import { useQuery } from "@apollo/client";
import UsersListTable from "@/components/users/users-list-table";
import StateHandler from "@/components/state-handler";

type Props = {};

const Page = (props: Props) => {
  const { data, error, loading } = useQuery<UsersData>(USERS, {
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

          <Card>
            <StateHandler
              empty={data?.users.items.length === 0}
              error={error}
              loading={loading}
            >
              <UsersListTable users={data?.users.items} />
            </StateHandler>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
