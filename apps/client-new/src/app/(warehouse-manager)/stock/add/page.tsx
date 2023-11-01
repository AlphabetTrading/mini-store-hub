"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Input,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowDropDown, ArrowDropUp, DeleteOutline } from "@mui/icons-material";
import CustomChip from "@/components/custom-chip";
import { showAlert } from "@/helpers/showAlert";
import { GET_TOTAL_VALUATION_OF_WAREHOUSE } from "@/graphql/warehouse-managers/queries";
import { WAREHOUSE_TRANSACTION_HISTORY } from "@/graphql/transfer-goods/queries";
import EmptyTable from "@/components/empty-table";

type Props = {};

const Page = (props: Props) => {
  const { data: sessionData } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStockItems, setSelectedStockItems] = useState<StockItem[]>([]);
  const [filteredStockItems, setFilteredStockItems] = useState<StockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const warehouseId = (sessionData?.user as any).warehouseId || "";

  useEffect(() => {
    setFilteredStockItems(
      selectedStockItems.filter((item) => filteredStockItems.includes(item))
    );
    handleSearch(searchQuery);
  }, [selectedStockItems]);

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
    setSelectedStockItems((prev) => {
      return prev.filter((item) => item.product.id !== id);
    });
  };

  const handleItemQuantityChange = (item: StockItem, val: number) => {
    setSelectedStockItems((prev) => {
      if (item.quantity + val <= 0) {
        return prev.filter((i) => i.product.id !== item.product.id);
      }
      return [
        ...prev.filter((i) => i.product.id !== item.product.id),
        { ...item, quantity: item.quantity + val },
      ];
    });
  };

  const handleSearch = (query: string) => {
    setFilteredStockItems(
      selectedStockItems.filter(
        (item) =>
          item.product.name.toLowerCase().includes(query) ||
          item.product.serialNumber.includes(query)
      )
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleRegisterStock = async () => {
    await registerIncomingStock({
      variables: {
        data: {
          goods: selectedStockItems.map((item: StockItem) => {
            return { productId: item.product.id, quantity: item.quantity };
          }),
          destinationWarehouseId: warehouseId,
        },
      },
      onCompleted: (data) => {
        router.push("/stock");
        showAlert("added a", "stock");
      },
      onError(error, clientOptions) {
        console.log(error);
      },
      refetchQueries: [
        { query: WAREHOUSE_STOCK },
        {
          query: GET_TOTAL_VALUATION_OF_WAREHOUSE,
          variables: {
            warehouseId: warehouseId,
          },
        },
        {
          query: WAREHOUSE_TRANSACTION_HISTORY,
          variables: {
            warehouseId: warehouseId,
          },
        },
      ],
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
                <Input
                  fullWidth
                  disableUnderline
                  placeholder="Search by name or serial number"
                  value={searchQuery}
                  onChange={handleChange}
                />
              </Stack>
              <TableContainer style={{ maxHeight: 400 }}>
                <Table stickyHeader sx={{ minWidth: 1200 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Categroy</TableCell>
                      <TableCell>Selected Quantity</TableCell>
                      <TableCell>Purchased Price</TableCell>
                      <TableCell>Selling Price</TableCell>
                      <TableCell>Total Value</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ maxHeight: 20 }}>
                    {filteredStockItems.length === 0 ? (
                      <EmptyTable colspan={7}/>
                    ) : (
                      filteredStockItems.map((item: StockItem, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Stack>
                              <Typography variant="body2">
                                {item.product.name}
                              </Typography>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >{`SN- ${item.product.serialNumber}`}</Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <CustomChip label={item.product.category.name} />
                          </TableCell>
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Stack>
                                <IconButton
                                  sx={{ p: 0 }}
                                  onClick={() =>
                                    handleItemQuantityChange(item, 1)
                                  }
                                >
                                  <ArrowDropUp />
                                </IconButton>
                                <IconButton
                                  sx={{ p: 0 }}
                                  onClick={() =>
                                    handleItemQuantityChange(item, -1)
                                  }
                                >
                                  <ArrowDropDown />
                                </IconButton>
                              </Stack>
                              <Typography>{item.quantity}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            {item.product.activePrice?.purchasedPrice}
                          </TableCell>
                          <TableCell>
                            {item.product.activePrice?.price}
                          </TableCell>
                          <TableCell>
                            {item.product.activePrice?.price * item.quantity}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleRemoveItem(item.product.id)}
                            >
                              <DeleteOutline color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
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
