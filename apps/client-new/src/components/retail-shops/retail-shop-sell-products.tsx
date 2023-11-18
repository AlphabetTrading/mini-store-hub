import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  Stack,
  Typography,
  Breadcrumbs,
  Card,
  CardHeader,
  Button,
  SvgIcon,
  Input,
  CircularProgress,
  Link,
  Alert,
  AlertTitle,
} from "@mui/material";
import BreadcrumbsSeparator from "../breadcrumbs-separator";
import ItemsSummaryTable from "../transfer-items/items-summary-table";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_SALE_TRANSACTION,
  CreateSaleTransactionData,
  CreateSaleTransactionVars,
} from "@/graphql/sale-transaction/mutations";
import SaleTransactionItemsDrawer from "../modals/sale-transaction-items-modal";
import {
  RETAIL_SHOP_STOCK,
  RetailShopStockData,
  RetailShopStockVars,
} from "@/graphql/retail-shops/queries";
import { SelectedStockItem, StockItem } from "../../../types/stock-item";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { showAlert } from "@/helpers/showAlert";

type Props = {
  retailShopId: string;
};

const RetailShopSellProducts = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [createSaleTransaction, { loading, error }] = useMutation<
    CreateSaleTransactionData,
    CreateSaleTransactionVars
  >(CREATE_SALE_TRANSACTION);

  const {
    data: retailShopStockData,
    error: retailShopStockError,
    loading: retailShopStockLoading,
    refetch: retailShopStockRefetch,
  } = useQuery<RetailShopStockData, RetailShopStockVars>(RETAIL_SHOP_STOCK, {
    variables: {
      filterRetailShopStockInput: {
        retailShopId: props.retailShopId,
      },
      orderBy: {
        product: {
          name: "asc"
        }
      },
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
    },
  });
  useEffect(() => {
    retailShopStockRefetch({
      filterRetailShopStockInput: {
        retailShopId: props.retailShopId,
        product: {
          // category: {
          //   name: {
          //     contains: searchQuery,
          //   },
          // },
          name: {
            contains: searchQuery,
          },
          // serialNumber: {
          //   contains: searchQuery,
          // },
        },
      },
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
    });
  }, [rowsPerPage, page, searchQuery]);

  const [selectedItems, setSelectedItems] = useState<SelectedStockItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [filteredItems, setFilteredItems] = useState<SelectedStockItem[]>([]);
  useEffect(() => {
    setFilteredItems(selectedItems);
  }, [selectedItems]);

  const handleSellProducts = async () => {

    await createSaleTransaction({
      variables: {
        data: {
          goods: selectedItems.map((item) => ({
            productId: item.stockItem.product.id,
            quantity: item.selectedQuantity,
          })),
          retailShopId: props.retailShopId,
          createdAt:selectedDate?.toISOString()
        },
      },
      onCompleted: () => {
        setSelectedItems([]);
        setSelectedDate(dayjs(new Date()));
        showAlert("created", "a sale transaction");
      },
    });
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.stockItem.product.id !== id)
    );
  };
  const handleAddItem = (item: StockItem, quantity: number) => {
    setSelectedItems((prev) => {
      const index = prev.findIndex(
        (i) => i.stockItem.product.id === item.product.id
      );
      if (index > -1) {
        prev[index].selectedQuantity = quantity;
        return [...prev];
      }
      return [...prev, { stockItem: item, selectedQuantity: quantity }];
    });
  };
  return (
    <>
      <Box component="main">
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack spacing={1}>
                <Typography variant="h4">Sell Products</Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link component={NextLink} href={"/admin/dashboard"}>
                    Dashboard
                  </Link>
                  <Link component={NextLink} href={"/admin/retail-shop"}>
                    Retail Shop
                  </Link>
                  <Typography>Sell Products</Typography>
                </Breadcrumbs>
              </Stack>
            </Stack>
            {error && (
              <Alert color="error">
                <AlertTitle>Error</AlertTitle>
                {error.message}
              </Alert>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                label="Transaction Date"
              />
            </LocalizationProvider>
            <Card>
              <CardHeader
                action={
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    Add
                  </Button>
                }
                title="Selected Products"
              />
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
                  disableUnderline
                  placeholder="Search by name or serial number"
                  //   value={searchQuery}
                  fullWidth
                  //   onChange={handleChange}
                />
              </Stack>
              <ItemsSummaryTable
                handleRemoveItem={handleRemoveItem}
                filteredItems={filteredItems}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </Card>
          </Stack>
          <Button
            disabled={loading}
            variant="contained"
            sx={{ my: 2 }}
            onClick={() => handleSellProducts()}
          >
            {loading && (
              <CircularProgress
                size={16}
                sx={{ mr: 1, color: "neutral.500" }}
              />
            )}
            Transfer Items
          </Button>
          {!selectedDate && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              Date is Empty
            </Alert>
          )}
          {selectedItems.length === 0 && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              Make sure you select at least one item
            </Alert>
          )}
          {/* {formError.retailShop && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {formError.retailShop}
            </Alert>
          )}
          {formError.warehouse && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {formError.warehouse}
            </Alert>
          )}
          {formError.items && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {formError.items}
            </Alert>
          )}
          {error && (
            <Alert color="error">
              <AlertTitle>Error</AlertTitle>
              {error.message}
            </Alert>
          )} */}
        </Container>
      </Box>
      <SaleTransactionItemsDrawer
        selectedItemsId={selectedItems.map((item) => item.stockItem.product.id)}
        handleAddItem={handleAddItem}
        open={open}
        setOpen={setOpen}
        retailShopId={props.retailShopId}
        retailShopStockLoading={retailShopStockLoading}
        retailShopStockError={retailShopStockError}
        retailShopStocks={
          retailShopStockData?.retailShopStockByRetailShopId.items || []
        }
        meta={retailShopStockData?.retailShopStockByRetailShopId.meta}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default RetailShopSellProducts;
