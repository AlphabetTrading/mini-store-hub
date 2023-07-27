import React, { useState } from "react";
import { Scrollbar } from "../scrollbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  WAREHOUSE_ITEMS,
  WarehouseItemsData,
  WarehouseStock,
} from "@/graphql/items/queries";
import ManagersListRow from "./managers-list-row";
import { User } from "../../../types/user";

type Props = {
  retailShopManagers: User[];
};

const ManagersListTable = ({ retailShopManagers }: Props) => {
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
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {retailShopManagers.map((retailShopManager, idx) => (
              <ManagersListRow
                key={idx}
                retailShopManager={retailShopManager}
                handleItemToggle={handleItemToggle}
                selected={retailShopManager.id === selectedItem}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

export default ManagersListTable;