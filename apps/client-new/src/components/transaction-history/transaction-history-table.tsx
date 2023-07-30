"use client";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import CustomChip from "../custom-chip";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";
import {
  TRANSACTION_HISTORY,
  TransactionHistoryData,
  TransactionHistoryVars,
} from "@/graphql/transfer-goods/queries";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";

type Props = {};

const TransactionHistoryTable = (props: Props) => {
  const { data, loading, error } = useQuery<
    TransactionHistoryData,
    TransactionHistoryVars
  >(TRANSACTION_HISTORY, {
    variables: {
      warehouseId: "clki1bbrx000srlwgvx7jzw1i",
    },
  });

  const statusMap = {
    WarehouseToWarehouse : 'error',
    WarehouseToRetailShop : 'success',

  }

  return (
    <Table>
      <TableBody>
        {/* {JSON.stringify(data)}
        {JSON.stringify(loading)}

        {JSON.stringify(error)} */}

        {data?.goodsTransferByWarehouseId?.map((item,idx) => {
          const day: string = dayjs(item?.createdAt).format("DD");
          const month: string = dayjs(item?.createdAt).format("MMM");
          const time: string = dayjs(item?.createdAt).format("hh:mm A");
          const color = statusMap[item.transferType];

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
                  <Typography variant="subtitle2">Retail Shop A</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {time}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <CustomChip label={item.transferType} status={color} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionHistoryTable;
