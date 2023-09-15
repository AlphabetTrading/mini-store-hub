"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Link,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Button,
  SvgIcon,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import NextLink from "next/link";
import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RetailShopBasicDetails from "@/components/retail-shops/retail-shop-basic-details";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useMutation, useQuery } from "@apollo/client";
import { ref } from "yup";
import {
  RETAIL_SHOP,
  RETAIL_SHOPS,
  RetailShopData,
  RetailShopVars,
} from "@/graphql/retail-shops/queries";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";
import {
  DeactivateRetailShopData,
  DeactivateRetailShopVars,
  DEACTIVATE_RETAIL_SHOP,
  ACTIVATE_RETAIL_SHOP,
  ActivateRetailShopData,
  ActivateRetailShopVars,
} from "@/graphql/retail-shops/mutations";
import StateHandler from "@/components/state-handler";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  const [
    deactivateRetailShop,
    {
      error: deactivateError,
      loading: deactivateLoading,
      reset: deactivateReset,
    },
  ] = useMutation<DeactivateRetailShopData, DeactivateRetailShopVars>(
    DEACTIVATE_RETAIL_SHOP
  );
  const [
    activateRetailShop,
    { error: activateError, loading: activateLoading, reset: activateReset },
  ] = useMutation<ActivateRetailShopData, ActivateRetailShopVars>(
    ACTIVATE_RETAIL_SHOP
  );
  const { data, error, loading } = useQuery<RetailShopData, RetailShopVars>(
    RETAIL_SHOP,
    {
      variables: {
        retailShopId: params.id,
      },
    }
  );

  const handleDeactivateRetailShop = async () => {
    await deactivateRetailShop({
      variables: {
        deactivateRetailShopId: params.id,
      },
      onCompleted(data, clientOptions) {
        showAlert("deactivated a", "retail shop");
      },
      update(cache, { data }) {
        console.log(data);
        const existingRetailShop: RetailShopData = cache.readQuery<
          RetailShopData,
          RetailShopVars
        >({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
        }) as RetailShopData;

        const newRetailShop: RetailShopData = {
          ...existingRetailShop,
          retailShop: {
            ...existingRetailShop?.retailShop,
            status: data?.status,
          },
        };
        cache.writeQuery<RetailShopData>({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
          data: {
            retailShop: newRetailShop.retailShop,
          },
        });
      },
      onError(error) {
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  const handleActivateRetailShop = async () => {
    await activateRetailShop({
      variables: {
        activateRetailShopId: params.id,
      },
      onCompleted(data, clientOptions) {
        showAlert("activated a", "retail shop");
      },
      update(cache, { data }) {
        const existingRetailShop: RetailShopData = cache.readQuery<
          RetailShopData,
          RetailShopVars
        >({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
        }) as RetailShopData;

        const newRetailShop: RetailShopData = {
          ...existingRetailShop,
          retailShop: {
            ...existingRetailShop?.retailShop,
            status: data?.status,
          },
        };
        cache.writeQuery<RetailShopData>({
          query: RETAIL_SHOP,
          variables: {
            retailShopId: params.id,
          },
          data: {
            retailShop: newRetailShop.retailShop,
          },
        });
      },
      onError(error) {
        setTimeout(() => {
          deactivateReset();
        }, 3000);
      },
    });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        )}

        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack spacing={1}>
              <Typography variant="h4">Retail Shop</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/retail-shops"}>
                  Retail Shops
                </Link>
                <Typography>Detail</Typography>
              </Breadcrumbs>
            </Stack>
            {data && (
              <Stack alignItems="center" direction="row" spacing={2}>
                <Button
                  variant={"outlined"}
                  color={data?.retailShop.status ? "error" : "primary"}
                  disabled={deactivateLoading || activateLoading}
                  // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
                  onClick={() =>
                    data?.retailShop.status
                      ? handleDeactivateRetailShop()
                      : handleActivateRetailShop()
                  }
                >
                  {(deactivateLoading || activateLoading) && (
                    <CircularProgress
                      size={16}
                      sx={{ mr: 1, color: "neutral.500" }}
                    />
                  )}
                  {data?.retailShop.status ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="contained"
                  component={NextLink}
                  endIcon={<SvgIcon>{<EditIcon />}</SvgIcon>}
                  href={`/admin/retail-shops/${params.id}/edit`}
                >
                  Edit
                </Button>
              </Stack>
            )}
          </Stack>
          <StateHandler loading={loading} error={error} empty={false}>
            {data && <RetailShopBasicDetails retailShop={data?.retailShop} />}
          </StateHandler>
          {/*<TransactionHistoryTable warehouseId={params.id} /> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
