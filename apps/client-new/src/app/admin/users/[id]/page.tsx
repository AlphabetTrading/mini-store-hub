"use client";
import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
  Breadcrumbs,
} from "@mui/material";
import { UserBasicDetails } from "@/components/users/user-basic-details";
import EditIcon from "@mui/icons-material/Edit";
import NextLink from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@apollo/client";
import { USER, UserData, UserVars } from "@/graphql/users/queries";
import StateHandler from "@/components/state-handler";
import UserRoleResponsibility from "@/components/users/user-role-responsibility";
import UserManagement from "@/components/users/user-management";
import UserOtherDetails from "@/components/users/user-other-detils";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";

const tabs = [
  { label: "Details", value: "details" },
  // { label: "Invoices", value: "invoices" },
  // { label: "Logs", value: "logs" },
];

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const { data, error, loading } = useQuery<UserData, UserVars>(USER, {
    variables: {
      userId: params.id,
    },
    fetchPolicy: "cache-and-network",
  });
  console.log(data?.user);

  return (
    <>
      <StateHandler loading={loading} error={error} empty={false}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={4}>
              <Stack spacing={2}>
                {/* <div>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href="/admin/users"
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon> 
                    <Typography variant="subtitle2">Users</Typography>
                  </Link>
                </div> */}
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link component={NextLink} href={"/admin/dashboard"}>
                    Dashboard
                  </Link>
                  <Link component={NextLink} href={"/admin/users"}>
                    Users
                  </Link>
                  <Typography>details</Typography>
                </Breadcrumbs>

                <Stack
                  alignItems="flex-start"
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Avatar
                      src={data?.user.userProfile?.photoUrl}
                      sx={{
                        height: 64,
                        width: 64,
                      }}
                    >
                      {/* Hanna Samuel */}
                      {/* {getInitials(customer.name)} */}
                    </Avatar>
                    <Stack spacing={1}>
                      <Typography variant="h4">
                        {data?.user.firstName} {data?.user.lastName}
                        {/* {customer.email} */}
                      </Typography>
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <Typography variant="subtitle2">user_id:</Typography>
                        <Chip label={params.id} size="small" />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Button
                      // color="inherit"
                      component={NextLink}
                      endIcon={
                        <SvgIcon>
                          <EditIcon />
                        </SvgIcon>
                      }
                      href={`/admin/users/${data?.user.id}/edit`}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </Stack>
                </Stack>
                <div>
                  <Tabs
                    indicatorColor="primary"
                    //   onChange={handleTabsChange}
                    scrollButtons="auto"
                    sx={{ mt: 3 }}
                    textColor="primary"
                    value={currentTab}
                    variant="scrollable"
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    ))}
                  </Tabs>
                  <Divider />
                </div>
              </Stack>
              {currentTab === "details" && (
                <div>
                  <Grid container spacing={4}>
                    <Grid xs={12} lg={4}>
                      <UserBasicDetails user={data?.user} />
                    </Grid>
                    <Grid xs={12} lg={8}>
                      <Stack spacing={4}>
                        <UserRoleResponsibility
                          role={data?.user.role}
                          createdAt={data?.user.createdAt}
                          retailShops={data?.user.retailShop}
                          warehouses={data?.user.warehouse}
                        />
                        <UserOtherDetails
                          address={data?.user.userProfile?.address}
                          idUrl={data?.user.userProfile?.idUrl}
                        />
                        <UserManagement
                          isActive={data?.user ? data?.user.isActive : true}
                          userId={data?.user.id || ""}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </div>
              )}
              {/* {currentTab === 'invoices' && <CustomerInvoices invoices={invoices} />}
            {currentTab === 'logs' && <CustomerLogs logs={logs} />} */}
            </Stack>
          </Container>
        </Box>
      </StateHandler>
    </>
  );
};

export default Page;
