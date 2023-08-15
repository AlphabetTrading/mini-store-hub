import { TablePagination } from "@mui/material";
import React from "react";
import { Meta } from "../../types/common";

type Props = {
  meta: Meta | undefined;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
};

const Pagination = ({
  meta,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: Props) => {
  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10)), setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={meta?.count || 0}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
};

export default Pagination;
