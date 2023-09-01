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
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  DELETE_WAREHOUSE,
  DeleteWarehouseVars,
} from "@/graphql/warehouses/mutations";
import { useMutation } from "@apollo/client";
import { WAREHOUSES } from "@/graphql/warehouses/queries";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [deleteWarehouse, { loading, error, reset }] = useMutation<
    {},
    DeleteWarehouseVars
  >(DELETE_WAREHOUSE);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteWarehouse({
      variables: {
        deleteWarehouseId: params.id,
      },
      refetchQueries: [{ query: WAREHOUSES }],
      onCompleted(data, clientOptions) {
        showAlert("deleted a", "warehouse");
        router.replace("/admin/warehouses");
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
              <Typography variant="h4">Warehouse</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link component={NextLink} href={"/admin/dashboard"}>
                  Dashboard
                </Link>
                <Link component={NextLink} href={"/admin/warehouses"}>
                  Warehouse
                </Link>
                <Typography>Detail</Typography>
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
