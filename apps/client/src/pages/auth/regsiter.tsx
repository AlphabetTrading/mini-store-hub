import { Layout as AuthLayout } from "../../layouts/auth/index";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {};
interface Values {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});
const Regsiter = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values: Values) => {},
  });

  return (
    <AuthLayout>
      <Card elevation={16}>
        <CardHeader title="Register" />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={!!(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={!!(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={
                  !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Stack>

            <FormHelperText error sx={{ mt: 3 }}>
              {/* {formik.errors.submit} */}
            </FormHelperText>
            <Button
            disabled={formik.isSubmitting}
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
            >
              Register User
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Regsiter;
