import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Layout as AuthLayout } from "../../layouts/auth";



type Props = {};
interface Values {
  phoneNumber: string;
  password: string;
}
const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().max(255).required("Password is required"),
});
const initialValues: Values = {
  phoneNumber:"",
  password: "",
};
const Login = (props: Props) => {
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {},
  });

  return (
    <AuthLayout>
      {/* <Seo title="Login" /> */}
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  // component={RouterLink}
                  // href={paths.auth.jwt.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            }
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
              {/* {formik.errors.submit && (
                <FormHelperText error sx={{ mt: 3 }}>
                  {formik.errors.submit}
                </FormHelperText>
              )} */}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
        <Stack spacing={3} sx={{ mt: 3 }}>
          {/* <Alert severity="error">
            <div>
              You can use <b>demo@devias.io</b> and password <b>Password123!</b>
            </div>
          </Alert> */}
          {/* <AuthIssuer issuer={issuer} /> */}
        </Stack>
      </div>
    </AuthLayout>
  );
};

export default Login;
