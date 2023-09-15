import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { WarehouseStockData } from "@/graphql/products/queries";
import ProductsListRow from "./products-list-row";
import { Product } from "../../../types/product";

type Props = {
  products: Product[];
};

const ProductsListTable = ({ products }: Props) => {
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
            <TableCell>Category</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Selling Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, idx) => (
            <ProductsListRow
              key={idx}
              product={product}
              handleItemToggle={handleItemToggle}
              selected={product.id === selectedItem}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsListTable;
