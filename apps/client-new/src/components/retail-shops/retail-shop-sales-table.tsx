import {
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useQuery } from "@apollo/client";
import StateHandler from "../state-handler";
import dayjs from "dayjs";
import RetailShopSaleDetail from "./retail-shop-sale-detail";
import { SaleTransaction } from "../../../types/sale-transaction";
import {
  RetailShopSaleTransactionsData,
  RetailShopSaleTransactionsVars,
  RETAIL_SHOP_SALE_TRANSACTIONS,
} from "@/graphql/sale-transaction/queries";

type Props = {
  retailShopId: string;
};

const RetailShopSalesTable = (props: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    query: "",
    filter: "updatedAt|desc",
  });
  const [saleTransaction, setSaleTransaction] =
    useState<SaleTransaction | null>(null);

  const { data, loading, error, fetchMore } = useQuery<
    RetailShopSaleTransactionsData,
    RetailShopSaleTransactionsVars
  >(RETAIL_SHOP_SALE_TRANSACTIONS, {
    variables: {
      retailShopId: props.retailShopId,
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    fetchMore({
      variables: {
        paginationInput: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
        },
      },
    });
  }, [page, rowsPerPage]);

  return (
    <div>
      {saleTransaction ? (
        <RetailShopSaleDetail
          saleTransaction={saleTransaction}
          closeDetail={() => setSaleTransaction(null)}
          retailShopId={props.retailShopId}
        />
      ) : (
        <StateHandler
          loading={loading}
          error={error}
          empty={data?.saleTransactionsByRetailShop.items.length === 0}
        >
          <Card>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 1200 }}>
                <TableHead>
                  <TableRow>
                    {/* <TableCell /> */}
                    <TableCell>Date</TableCell>
                    {/* <TableCell>Time</TableCell> */}
                    <TableCell>Items</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.saleTransactionsByRetailShop.items.map(
                    (saleTransaction, idx) => {
                      console.log(saleTransaction);
                      return (
                        <TableRow key={idx}>
                          <TableCell width={100}>
                            <Stack>
                              <Typography variant="body2">
                                {dayjs(saleTransaction.createdAt).format(
                                  "MMM DD, YYYY"
                                )}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {dayjs(saleTransaction.createdAt).format(
                                  "hh:mm:ss a"
                                )}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell width={100}>
                            {saleTransaction.saleTransactionItems.length}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" color="text.secondary">
                              ETB
                              <Typography
                                color="success.main"
                                variant="body1"
                                component="span"
                              >
                                {` +${
                                  saleTransaction.totalPrice
                                    ? saleTransaction.totalPrice.toLocaleString()
                                    : 0
                                }`}
                              </Typography>
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                setSaleTransaction(saleTransaction)
                              }
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              meta={data?.saleTransactionsByRetailShop.meta}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Card>
        </StateHandler>
      )}
    </div>
  );
};

export default RetailShopSalesTable;
