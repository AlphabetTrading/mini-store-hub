"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { ITEMS, ItemsData, WAREHOUSE_ITEMS } from "@/graphql/items/queries";
import {
  REGISTER_INCOMING_STOCK,
  RegisterIncomingStockData,
  RegisterIncomingStockVars,
} from "@/graphql/warehouse/mutations";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {};

const page = (props: Props) => {
  const { data: sessionData } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  const [registerIncomingStock, { data, loading }] = useMutation<
    RegisterIncomingStockData,
    RegisterIncomingStockVars
  >(REGISTER_INCOMING_STOCK);
  const router = useRouter();

  console.log(sessionData);

  const handleAddItem = (item: any) => {
    setItems((prev: any) => {
      return [...prev, item];
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev: any) => {
      return prev.filter((item: any) => item.id !== id);
    });
  };

  const handleRegisterStock = async () => {
    await registerIncomingStock({
      variables: {
        data: {
          goods: items.map((item: any) => {
            return { productId: item.selectedItem.id, quantity: item.quantity };
          }),
          warehouseId: "clki1bbrx000srlwgvx7jzw1i",
        },
      },
      onCompleted: (data) => {
        console.log(data);
        router.push("/items");
      },
      onError(error, clientOptions) {
        console.log(error);
      },
      refetchQueries: [WAREHOUSE_ITEMS],
    });
  };

  return (
    <>
      <AddIncomingItemModal
        open={modalOpen}
        handleAddItem={handleAddItem}
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
                  <Link component={NextLink} href={"/items"}>
                    Items
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
              <Scrollbar>
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
                    {items.map((item: any) => (
                      <TableRow>
                        <TableCell>{item.selectedItem.name}</TableCell>
                        <TableCell>{item.selectedItem.serialNumber}</TableCell>
                        <TableCell>{item.selectedItem.category.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        {/* <TableCell>{item.activePrice.purchasedPrice}</TableCell> */}
                        {/* <TableCell>{item.activePrice.price}</TableCell>
                        <TableCell>{item.activePrice.price}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Scrollbar>
            </Card>
            <Stack justifyContent="flex-start" direction="row">
              <Button onClick={handleRegisterStock} variant="contained">
                Regsiter
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default page;
