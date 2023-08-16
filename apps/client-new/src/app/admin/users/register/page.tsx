"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  REGISTER_USER,
  RegisterUserData,
  RegisterUserVars,
} from "@/graphql/users/mutations";
import { USERS } from "@/graphql/users/queries";
import { useMutation } from "@apollo/client";
import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import NextLink from "next/link";
import AddIcon from "@mui/icons-material/Add";

type Props = {};
interface Values {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  username: string;
}

const initialValues: Values = {
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  username: "",
};
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
  phone: Yup.string().matches(
    /^(09|07)\d{8}$/,
    "Phone number must start with 09 or 07 and have 10 digits"
  ),

  username: Yup.string().required("Username is required"),
});

const Page = (props: Props) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      await registerUser({
        variables: {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            phone: values.phone,
            username: values.username,
          },
        },
        onCompleted: (data) => {
          formikHelpers.resetForm();
        },
        refetchQueries: [USERS],
      });
    },
  });
  const [registerUser, { data, loading, error }] = useMutation<
    RegisterUserData,
    RegisterUserVars
  >(REGISTER_USER);

  return (
    <Box component="main" sx={{ p: 8 }}>
      <Stack spacing={1}>
        <Typography variant="h4">Regsiter User</Typography>
        <Breadcrumbs separator={<BreadcrumbsSeparator />}>
          <Link component={NextLink} href={"/admin/dashboard"}>
            Dashboard
          </Link>
          <Link component={NextLink} href={"/admin/users"}>
            Users
          </Link>
          <Typography>Register User</Typography>
        </Breadcrumbs>
      </Stack>
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Card elevation={16}>
          <CardHeader
            // subheader={(
            //   <Typography
            //     color="text.secondary"
            //     variant="body2"
            //   >
            //     Already have an account?
            //     &nbsp;
            //     <Link
            //       component={NextLink}
            //       href={paths.auth.jwt.login}
            //       underline="hover"
            //       variant="subtitle2"
            //     >
            //       Log in
            //     </Link>
            //   </Typography>
            // )}
            sx={{ pb: 0 }}
            title="Register"
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                  }
                  fullWidth
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  label="First name"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last name"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Username"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                  mt: 1,
                }}
              ></Box>
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                {formik.isSubmitting && (
                  <CircularProgress
                    size={16}
                    sx={{ mr: 1, color: "neutral.500" }}
                  />
                )}
                Register
              </Button>
            </form>

            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error.message}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Page;
