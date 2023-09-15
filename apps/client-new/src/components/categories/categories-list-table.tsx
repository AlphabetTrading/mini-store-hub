import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Category } from "../../../types/categories";
import CategoriesListRow from "./categories-list-row";

type Props = {
  categories: Category[];
};

const CategoriesListTable = ({ categories }: Props) => {
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
    <TableContainer sx={{ overflow: "auto" }}>
      <Table sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, idx) => (
            <CategoriesListRow
              key={idx}
              category={category}
              handleItemToggle={handleItemToggle}
              selected={category.id === selectedItem}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesListTable;
