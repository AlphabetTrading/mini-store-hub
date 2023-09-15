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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";
import UsersList from "@/components/users/users-list";

type Props = {};

const Page = (props: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All" />
              <Tab label="Admins" />
              <Tab label="Retail Shop Managers" />
              <Tab label="Warehouse Managers" />
            </Tabs>
            <UsersList roleIndex={value} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
