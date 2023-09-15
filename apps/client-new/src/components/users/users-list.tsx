import page from "@/app/(warehouse-manager)/dashboard/page";
import loading from "@/app/loading";
import { UsersData, USERS } from "@/graphql/users/queries";
import { useQuery } from "@apollo/client";
import { Typography, Box, Card, CircularProgress } from "@mui/material";
import error from "next/error";
import React, { useEffect, useState } from "react";
import CustomTabPanel from "../custom-tab-panel";
import StateHandler from "../state-handler";
import UsersListTable from "./users-list-table";
import { UserRole } from "../../../types/user";
import Pagination from "../Pagination";
import UsersListSearch from "./users-list-search";

type Props = {
  roleIndex: number;
};

const OrderBySelector = (filter: string) => {
  const filterType = filter.split("|")[0];
  switch (filterType) {
    case "firstName":
      return {
        firstName: filter.split("|")[1],
      };
    case "lastName":
      return {
        lastName: filter.split("|")[1],
      };
  }
};

const UsersList = ({ roleIndex }: Props) => {
  const [filter, setFilter] = useState({
    query: "",
    filter: "firstName|asc",
  });

  const roles = [
    undefined,
    UserRole.ADMIN,
    UserRole.RETAIL_SHOP_MANAGER,
    UserRole.WAREHOUSE_MANAGER,
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, error, loading, refetch } = useQuery<UsersData>(USERS, {
    variables: {
      filterUserInput: {
        role: roles[roleIndex],
      },
      paginationInput: {
        skip: page * rowsPerPage,
        take: rowsPerPage,
      },
      orderBy: OrderBySelector(filter.filter),
    },
    // fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch({
        filterUserInput: {
          firstName: {
            contains: filter.query,
          },
          lastName: {
            contains: filter.query,
          },
          role: roles[roleIndex],
          // phone: {
          //   contains: filter.query,
          // },
        },
        paginationInput: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
        },
        orderBy: OrderBySelector(filter.filter),
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [filter, page, refetch, roles, rowsPerPage, roleIndex]);

  return (
    <Box>
      <UsersListSearch filter={filter} setFilter={setFilter} />
      <StateHandler
        empty={data?.users.items.length === 0}
        error={error}
        loading={loading}
      >
        <Box sx={{ width: "100%" }}>
          <CustomTabPanel value={roleIndex} index={roleIndex}>
            <Card>
              <UsersListTable users={data?.users.items} />
              <Pagination
                meta={data?.users.meta!}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </Card>
          </CustomTabPanel>
        </Box>
      </StateHandler>
    </Box>
  );
};

export default UsersList;
