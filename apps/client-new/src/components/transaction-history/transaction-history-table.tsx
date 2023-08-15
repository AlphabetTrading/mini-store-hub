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
import React from "react";
import CustomChip from "../custom-chip";
import dayjs from "dayjs";
import {
  TransactionHistory,
  TransferType,
} from "../../../types/transaction-history";
import { useQuery } from "@apollo/client";
import StateHandler from "../state-handler";
import {
  WarehouseTransactionHistoryData,
  WarehouseTransactionHistoryVars,
  WAREHOUSE_TRANSACTION_HISTORY,
} from "@/graphql/transfer-goods/queries";

type Props = {
  warehouseId: string;
};

const TransactionHistoryTable = ({ warehouseId }: Props) => {
  const { data, loading, error } = useQuery<
    WarehouseTransactionHistoryData,
    WarehouseTransactionHistoryVars
  >(WAREHOUSE_TRANSACTION_HISTORY, {
    variables: {
      warehouseId: warehouseId,
    },
  });
  const transactionHistory: TransactionHistory[] =
    data?.findGoodsTransferByWarehouseId.items || [];

  const statusMap = {
    WarehouseToWarehouse: "success",
    WarehouseToRetailShop: "error",
  };
  const statusTextMap = {
    WarehouseToWarehouse: "Incoming Goods",
    WarehouseToRetailShop: "Outgoing Goods",
  };

  return (
    <StateHandler
      loading={loading}
      error={error}
      empty={transactionHistory.length === 0}
    >
      <Card>
        <CardHeader title="Latest Transactions" />
        <Table>
          <TableBody>
            {transactionHistory?.map((item, idx) => {
              const day: string = dayjs(item?.createdAt).format("DD");
              const month: string = dayjs(item?.createdAt).format("MMM");
              const time: string = dayjs(item?.createdAt).format("hh:mm A");

              return (
                <TableRow key={idx}>
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
                        {item.transferType == TransferType.WarehouseToWarehouse
                          ? "Warehouse"
                          : item.retailShop?.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {time}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <CustomChip
                      label={statusTextMap[item.transferType]}
                      status={statusMap[item.transferType]}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </StateHandler>
  );
};

export default TransactionHistoryTable;
