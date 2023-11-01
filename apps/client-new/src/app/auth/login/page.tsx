"use client";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";

type Props = {};
interface Values {
  phoneNumber: string;
  password: string;
}
const validationSchema = Yup.object({
  // phoneNumber: Yup.string().matches(
  //   /^(09|07)\d{8}$/,
  //   "Phone number must start with 09 or 07 and have 10 digits"
  // ),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
});
const initialValues: Values = {
  phoneNumber: "",
  password: "",
};

const Login = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true);
      const res = await signIn("credentials", {
        redirect: false,
        phone: values.phoneNumber,
        password: values.password,
        callbackUrl,
      });

      console.log(res);
      if (!res?.error) {
        redirect(callbackUrl);
      } else {
        setError("invalid email or password");
      }
      helpers.setSubmitting(false);
    },
  });

  return (
    <div>
      <Card elevation={16}>
        <CardHeader
          // subheader={
          //   <Typography color="text.secondary" variant="body2">
          //     Don&apos;t have an account? &nbsp;
          //     <Link
          //       // href={paths.auth.jwt.register}
          //       underline="hover"
          //       variant="subtitle2"
          //     >
          //       Register
          //     </Link>
          //   </Typography>
          // }
          sx={{ pb: 0 }}
          title="Log in"
        />
        <CardContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                autoFocus
                error={
                  !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                }
                fullWidth
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                label="Phone Number"
                name="phoneNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.phoneNumber}
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
            {formik.errors && (
              <FormHelperText error sx={{ mt: 3 }}>
                {/* {formik.errors} */}
              </FormHelperText>
            )}
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
                  sx={{
                    mr: 1,
                    color: "neutral.500",
                  }}
                />
              )}
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
      {error && (
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Alert severity="error">
            <div>
              <Typography color="inherit" variant="subtitle2">
                {error}
              </Typography>
            </div>
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default Login;
