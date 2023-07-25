import React, { useState } from "react";
import { Scrollbar } from "../scrollbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import RetailShopsListRow from "./retail-shops-list-row";
import { RetailShop } from "../../../types/retail-shop";

type Props = {
  retailShops: RetailShop[];
};

const RetailShopsListTable = ({ retailShops }: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleItemToggle = (id: string) => {
    setSelectedItem((prev) => {
      if (prev === id) {
        return null;
      }
      return id;
    });
  };

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell> Name</TableCell>
              <TableCell>Shop Manager</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Coordinates</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {retailShops.map((retailShop, idx) => (
              <RetailShopsListRow
                key={idx}
                retailShop={retailShop}
                handleItemToggle={handleItemToggle}
                selected={retailShop.id === selectedItem}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

export default RetailShopsListTable;
