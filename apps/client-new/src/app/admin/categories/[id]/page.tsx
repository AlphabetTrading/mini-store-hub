"use client";
import { useState } from "react";

import {
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
import EditIcon from "@mui/icons-material/Edit";
import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import StateHandler from "@/components/state-handler";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import { ImageOutlined } from "@mui/icons-material";
import { CategoryData, CategoryVars, CATEGORY } from "@/graphql/categories/queries";
import CategoryBasicDetails from "@/components/categories/category-basic-details";

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
  const { data, error, loading } = useQuery<CategoryData, CategoryVars>(CATEGORY, {
    variables: {
      categoryId: params.id,
    },
    fetchPolicy: "cache-and-network",
  });

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
                  <Link component={NextLink} href={"/admin/categories"}>
                    Categories
                  </Link>
                  <Typography>Detail</Typography>
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
                    {data?.category?.image ? (
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "neutral.50",
                          backgroundImage: `url("${data?.category?.image}")`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          borderRadius: 1,
                          display: "flex",
                          height: 80,
                          justifyContent: "center",
                          overflow: "hidden",
                          width: 80,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "neutral.50",
                          borderRadius: 1,
                          display: "flex",
                          height: 80,
                          justifyContent: "center",
                          width: 80,
                        }}
                      >
                        <SvgIcon>
                          <ImageOutlined />
                        </SvgIcon>
                      </Box>
                    )}

                    <Stack spacing={1}>
                      <Typography variant="h4">
                        {data?.category?.name}
                        {/* {customer.email} */}
                      </Typography>
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <Typography variant="subtitle2">product_id:</Typography>
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
                      href={`/admin/products/${data?.category.id}/edit`}
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
                <Stack>
                  <CategoryBasicDetails category={data?.category} />
                </Stack>
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
