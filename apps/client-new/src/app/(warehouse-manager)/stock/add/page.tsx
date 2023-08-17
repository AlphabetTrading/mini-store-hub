"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Input,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { Scrollbar } from "@/components/scrollbar";
import SearchIcon from "@mui/icons-material/Search";
import { AddIncomingItemModal } from "@/components/modals/incoming-items-modal";
import { useMutation, useQuery } from "@apollo/client";
import {
  REGISTER_INCOMING_STOCK,
  RegisterIncomingStockData,
  RegisterIncomingStockVars,
} from "@/graphql/warehouses/mutations";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { WAREHOUSE_STOCK } from "@/graphql/products/queries";
import { StockItem } from "../../../../../types/product";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStockItems, setSelectedStockItems] = useState<StockItem[]>([]);
  const [registerIncomingStock, { data, loading }] = useMutation<
    RegisterIncomingStockData,
    RegisterIncomingStockVars
  >(REGISTER_INCOMING_STOCK);
  const router = useRouter();

  const handleAddItem = (item: StockItem) => {
    setSelectedStockItems((prev: StockItem[]) => {
      return [...prev, item];
    });
  };

  const handleRemoveItem = (id: string) => {
    setSelectedStockItems((prev: any) => {
      return prev.filter((item: any) => item.id !== id);
    });
  };

  const handleRegisterStock = async () => {
    await registerIncomingStock({
      variables: {
        data: {
          goods: selectedStockItems.map((item: StockItem) => {
            return { productId: item.product.id, quantity: item.quantity };
          }),
          destinationWarehouseId: (sessionData?.user as any).warehouseId || "",
        },
      },
      onCompleted: (data) => {
        router.push("/stock");
      },
      onError(error, clientOptions) {
        console.log(error);
      },
      refetchQueries: [WAREHOUSE_STOCK],
    });
  };

  return (
    <>
      <AddIncomingItemModal
        open={modalOpen}
        handleAddItem={handleAddItem}
        selectedStockItems={selectedStockItems}
        handleClose={() => setModalOpen(false)}
      />
      <Box component="main" sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={1}>
                <Typography variant="h4">Register Incoming Items</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link component={NextLink} href={"/dashboard"}>
                    Dashboard
                  </Link>
                  <Link component={NextLink} href={"/stock"}>
                    Stock
                  </Link>
                  <Typography>Register Incoming Items</Typography>
                </Breadcrumbs>
              </Stack>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setModalOpen(true)}
              >
                Add
              </Button>
            </Stack>
            <Card>
              <CardHeader title="Incoming Items" />

              <Divider />
              <Stack
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
                direction="row"
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
                <Input disableUnderline placeholder="Search by product name" />
              </Stack>
              <Table sx={{ minWidth: 1200 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Categroy</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Purchased Price</TableCell>
                    <TableCell>Selling Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedStockItems.map((item: StockItem, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.product.serialNumber}</TableCell>
                      <TableCell>{item.product.category.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {item.product.activePrice?.purchasedPrice}
                      </TableCell>
                      <TableCell>{item.product.activePrice?.price}</TableCell>
                      <TableCell>{item.product.activePrice?.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Stack justifyContent="flex-start" direction="row">
              <Button
                disabled={loading}
                onClick={() => handleRegisterStock()}
                variant="contained"
              >
                {loading && (
                  <CircularProgress
                    sx={{ mr: 1, color: "neutral.500" }}
                    size={16}
                  />
                )}
                Regsiter
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
