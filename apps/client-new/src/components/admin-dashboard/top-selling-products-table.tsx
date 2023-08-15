import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  Card,
  CardHeader,
} from "@mui/material";
import React from "react";

type Props = {};

const TopSellingProducts = (props: Props) => {
  return (
    <Card>
      <CardHeader title="Top Selling Products" />
      <Table sx={{ minWidth: 800, overflow:"auto" }} >
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Items Sold</TableCell>
            <TableCell>Total Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell width="25%">
              <Stack>
                <Typography variant="subtitle2" color="text.primary">
                  Abu Walad
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial Number: #001
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>Biscuit</TableCell>
            <TableCell>123</TableCell>
            <TableCell>7,654</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Stack>
                <Typography variant="subtitle2" color="text.primary">
                  Abu Walad
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial Number: #001
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>Biscuit</TableCell>
            <TableCell>123</TableCell>
            <TableCell>7,654</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default TopSellingProducts;
