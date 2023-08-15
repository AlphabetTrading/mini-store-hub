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
import {
  DELETE_RETAIL_SHOP,
  DeleteRetailShopVars,
} from "@/graphql/retail-shops/mutations";
import { useMutation } from "@apollo/client";
import { ref } from "yup";
import { RETAIL_SHOPS } from "@/graphql/retail-shops/queries";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  const [deleteRetailShop, { error, loading, reset }] = useMutation<
    {},
    DeleteRetailShopVars
  >(DELETE_RETAIL_SHOP);
  const handleDelete = async () => {
    await deleteRetailShop({
      variables: {
        deleteRetailShopId: params.id,
      },
      refetchQueries: [RETAIL_SHOPS],
      onCompleted(data, clientOptions) {
        router.back();
      },
      onError(error) {
        setTimeout(() => {
          reset();
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
                <Typography>List</Typography>
              </Breadcrumbs>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="error"
                disabled={loading}
                // endIcon={<SvgIcon>{<DeleteOutlineIcon />}</SvgIcon>}
                onClick={() => handleDelete()}
              >
                {loading && (
                  <CircularProgress
                    size={16}
                    sx={{ mr: 1, color: "neutral.500" }}
                  />
                )}
                Delete
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
          </Stack>
          <RetailShopBasicDetails retailShopId={params.id} />
          {/*<TransactionHistoryTable warehouseId={params.id} /> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
