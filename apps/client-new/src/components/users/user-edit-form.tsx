import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { User, UserRole } from "../../../types/user";
import {
  UpdateUserData,
  UpdateUserVars,
  UPDATE_USER,
} from "@/graphql/users/mutations";
import { USERS } from "@/graphql/users/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

type Props = {
  user?: User;
};
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

export const UserEditForm = ({ user }: Props) => {
  const [updateUser, { data, loading, error }] = useMutation<
    UpdateUserData,
    UpdateUserVars
  >(UPDATE_USER);

  const router = useRouter();

  const initialValues: Values = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    role: user?.role || UserRole.USER,
    phoneNumber: user?.phone || "",
    username: user?.username || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      updateUser({
        variables: {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phoneNumber,
            username: values.username,
            role: values.role,
            userProfile: {
              userId: user?.id || "",
            },
          },
        },
        refetchQueries: [USERS],
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit Customer" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.firstName && formik.touched.firstName
                    ? true
                    : false
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                //   defaultValue={user.firstName}
                fullWidth
                label="First name"
                name="firstName"
                type="text"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.lastName && formik.touched.lastName
                    ? true
                    : false
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                //   defaultValue={user.lastName}
                fullWidth
                label="Last name"
                name="lastName"
                type="text"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={formik.errors.role && formik.touched.role ? true : false}
                helperText={formik.touched.role && formik.errors.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                //   defaultValue={user.role}
                fullWidth
                label="Role"
                select
              >
                {Object.values(UserRole).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.phoneNumber && formik.touched.phoneNumber
                    ? true
                    : false
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                fullWidth
                label="Phone number"
                name="phoneNumber"
                type="text"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.username && formik.touched.username
                    ? true
                    : false
                }
                helperText={formik.touched.username && formik.errors.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                fullWidth
                label="Username"
                name="username"
                type="text"
              />
            </Grid>
            <Grid xs={12} md={6}></Grid>
            <Grid xs={12} md={6}></Grid>
          </Grid>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            ></Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {formik.isSubmitting && (
              <CircularProgress
                size={16}
                sx={{ mr: 1, color: "neutral.500" }}
              />
            )}
            Update
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
