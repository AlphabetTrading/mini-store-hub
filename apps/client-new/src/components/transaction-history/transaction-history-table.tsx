"use client";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
  CardHeader,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomChip from "../custom-chip";
import dayjs from "dayjs";
import { GoodsTransfer, TransferType } from "../../../types/goods-transfer";
import { useQuery } from "@apollo/client";
import StateHandler from "../state-handler";
import {
  WarehouseTransactionHistoryData,
  WarehouseTransactionHistoryVars,
  WAREHOUSE_TRANSACTION_HISTORY,
} from "@/graphql/transfer-goods/queries";
import TransactionHistoryDetail from "./transasction-history-detail";
import Pagination from "../Pagination";
import TransactionHistoryOutgoing from "./transaction-history-outgoing";

type Props = {
  warehouseId: string;
};

const TransactionHistoryTable = ({ warehouseId }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, loading, error, fetchMore } = useQuery<
    WarehouseTransactionHistoryData,
    WarehouseTransactionHistoryVars
  >(WAREHOUSE_TRANSACTION_HISTORY, {
    variables: {
      warehouseId: warehouseId,
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
      orderBy: {
        createdAt: "desc",
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
  }, [rowsPerPage, page]);

  const [transactionHistory, setTransactionHistory] =
    useState<GoodsTransfer | null>(null);

  const transactionHistoryList: GoodsTransfer[] =
    data?.findGoodsTransferByWarehouseId.items || [];

  const statusMap = {
    WarehouseToWarehouse: "success",
    WarehouseToRetailShop: "error",
  };
  const statusTextMap = {
    WarehouseToWarehouse: "Incoming Goods",
    WarehouseToRetailShop: "Outgoing Goods",
  };

  return transactionHistory ? (
    <>
      {transactionHistory.transferType == TransferType.WarehouseToWarehouse && (
        <TransactionHistoryDetail
          closeDetail={() => setTransactionHistory(null)}
          transactionHistory={transactionHistory}
        />
      )}
      {transactionHistory.transferType ==
        TransferType.WarehouseToRetailShop && (
        <TransactionHistoryOutgoing
          warehoueId={warehouseId}
          closeDetail={() => setTransactionHistory(null)}
          transactionHistory={transactionHistory}
        />
      )}
     
    </>
  ) : (
    <Card>
      <CardHeader title="Latest Transactions" />
      <StateHandler
        loading={loading}
        error={error}
        empty={transactionHistoryList.length === 0}
      >
        <Table>
          <TableBody>
            {transactionHistoryList.map((transactionHistory, idx) => {
              const day: string = dayjs(transactionHistory?.createdAt).format(
                "DD"
              );
              const month: string = dayjs(transactionHistory?.createdAt).format(
                "MMM"
              );
              const time: string = dayjs(transactionHistory?.createdAt).format(
                "hh:mm A"
              );

              return (
                <TableRow
                  key={idx}
                  onClick={() => setTransactionHistory(transactionHistory)}
                  sx={{
                    cursor: "pointer",
                  }}
                  hover
                >
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        backgroundColor: "neutral.200",
                        p: 1,
                        maxWith: "fit-content",
                      }}
                    >
                      <Typography align="center" variant="subtitle2">
                        {month.toUpperCase()}
                      </Typography>
                      <Typography align="center" variant="h6">
                        {day}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">
                        {transactionHistory.transferType ==
                        TransferType.WarehouseToWarehouse
                          ? "Warehouse"
                          : transactionHistory.retailShop?.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {time}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <CustomChip
                      label={statusTextMap[transactionHistory.transferType]}
                      status={statusMap[transactionHistory.transferType]}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          meta={data?.findGoodsTransferByWarehouseId.meta}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </StateHandler>
    </Card>
  );
};

export default TransactionHistoryTable;
