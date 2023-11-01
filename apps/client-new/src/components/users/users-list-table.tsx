import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { User } from "../../../types/user";
import UsersListRow from "./users-list-row";

type Props = {
  users: User[] | undefined;
};

const UsersListTable = ({ users }: Props) => {
  // const [selectedUser, setSelectedUser] = useState<string | null>(null);
  // const handleToggle = (id: string) => {
  //   setSelectedUser((prev) => {
  //     if (prev === id) {
  //       return null;
  //     }
  //     return id;
  //   });
  // };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Full Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user, idx) => (
          <UsersListRow key={idx} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersListTable;
