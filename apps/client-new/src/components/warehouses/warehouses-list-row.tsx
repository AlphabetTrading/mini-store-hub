import { TableRow, TableCell } from "@mui/material";
import React from "react";
import { Warehouse } from "../../../types/warehouse";
import NextLink from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";

type Props = {
  warehouse: Warehouse;
};

const WarehousesListRow = ({ warehouse }: Props) => {
  const router = useRouter();
  return (
    <TableRow
      hover
      sx={{ textDecoration: "none", position: "relative", cursor: "pointer" }}
      onClick={() => router.push(`/admin/warehouses/${warehouse.id}`)}
    >
      <TableCell>{warehouse?.name}</TableCell>
      <TableCell>
        {warehouse?.warehouseManager
          ? `${warehouse?.warehouseManager?.firstName} ${warehouse?.warehouseManager?.lastName}`
          : "-"}
      </TableCell>
      <TableCell>
        {warehouse?.address ? warehouse?.address?.formattedAddress : "-"}
      </TableCell>
      {/* <ChevronRightIcon
        sx={{
          position: "absolute",
          top: "50%",
          bottom: "50%",
          margin: "auto",
          right: 8,
        }}
      /> */}
    </TableRow>
  );
};

export default WarehousesListRow;
