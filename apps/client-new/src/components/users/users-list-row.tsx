import {
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { User, UserRole } from "../../../types/user";
import {
  UPDATE_USER,
  UpdateUserData,
  UpdateUserVars,
} from "@/graphql/users/mutations";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { USERS } from "@/graphql/users/queries";
import NextLink from "next/link";
type Props = {
  user: User;
};

const Roles = [
  UserRole.ADMIN,
  UserRole.WAREHOUSE_MANAGER,
  UserRole.RETAIL_SHOP_MANAGER,
  UserRole.USER,
];

interface Values {
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber: string;
  username: string;
}
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  username: Yup.string().required("Username is required"),
});

const UsersListRow = ({ user }: Props) => {
  return (
    <>
      <TableRow
        component={NextLink}
        href={`/admin/users/${user.id}`}
        hover
        sx={{ textDecoration: "none" }}
      >
        <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>
          {user.userProfile?.address.street} {user.userProfile?.address.city}
        </TableCell>
      </TableRow>
    </>
  );
};

export default UsersListRow;