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
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NextLink from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import StateHandler from "@/components/state-handler";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  PRODUCT,
  PRODUCTS,
  ProductData,
  ProductVars,
} from "@/graphql/products/queries";
import { Delete, ImageOutlined } from "@mui/icons-material";
import EditPriceHistory from "@/components/products/edit-price-history";
import { ProductBasicDetails } from "@/components/products/product-basic-details";
import {
  DeleteProductData,
  DeleteProductVars,
  DELETE_PRODUCT,
} from "@/graphql/products/mutations";
import { showAlert } from "@/helpers/showAlert";

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
  const { data, error, loading } = useQuery<ProductData, ProductVars>(PRODUCT, {
    variables: {
      productId: params.id,
    },
    fetchPolicy: "cache-and-network",
  });
  const [
    deleteProduct,
    { loading: deleteLoading, error: deleteError, reset: deleteReset },
  ] = useMutation<DeleteProductData, DeleteProductVars>(DELETE_PRODUCT);
  const handleDeleteProduct = async () => {
    await deleteProduct({
      variables: {
        deleteProductId: data?.product.id || "",
      },
      refetchQueries: [{ query: PRODUCTS }],
      onCompleted: () => {
        showAlert("removed a", "product");
      },
    });
  };

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
                  <Link component={NextLink} href={"/admin/products"}>
                    Products
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
                    {data?.product?.images?.length || 0 > 0 ? (
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "neutral.50",
                          backgroundImage: `url("${data?.product?.images[0]}")`,
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
                        {data?.product?.name}
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
                      href={`/admin/products/${data?.product.id}/edit`}
                      variant="contained"
                    >
                      Edit
                    </Button>

                    <Button
                      disabled={deleteLoading}
                      onClick={() => {
                        handleDeleteProduct();
                      }}
                      color="error"
                      variant="outlined"
                    >
                      {deleteLoading && (
                        <CircularProgress
                          sx={{
                            color: "neutral.400",
                            // display: loading ? "block" : "none",
                            width: "25px !important",
                            height: "25px !important",
                            mr: 1,
                          }}
                        />
                      )}
                      Delete
                    </Button>
                  </Stack>
                </Stack>
                {deleteError && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {deleteError?.message}
                  </Alert>
                )}
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
                  <ProductBasicDetails product={data?.product} />
                  {/* <EditPriceHistory productId={params.id} /> */}
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
