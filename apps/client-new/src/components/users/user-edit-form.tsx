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
  TextField,
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
import { USER } from "@/graphql/users/queries";
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
  city: string;
  formattedAddress: string;
  street: string;
  lat: number;
  lng: number;
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
    city: user?.userProfile?.address?.city || "",
    formattedAddress: user?.userProfile?.address?.formattedAddress || "",
    street: user?.userProfile?.address?.street || "",
    lat: user?.userProfile?.address?.lat || 0,
    lng: user?.userProfile?.address?.lng || 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateUser({
        variables: {
          updateUserbyIdId: user?.id || "",
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phoneNumber,
            username: values.username,
            role: values.role,
            userProfile: {
              address: {
                city: values.city,
                formattedAddress: values.formattedAddress,
                lat: values.lat,
                lng: values.lng,
                street: values.street,
              },
            },
          },
        },
        onCompleted: (data) => {
          router.back();
        },
        refetchQueries: [USER],
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit User" />
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
            <Grid xs={12} md={6}>
              <TextField
                error={formik.errors.city && formik.touched.city ? true : false}
                helperText={formik.touched.city && formik.errors.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                fullWidth
                label="City"
                name="city"
                type="text"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.street && formik.touched.street ? true : false
                }
                helperText={formik.touched.street && formik.errors.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
                fullWidth
                label="Street"
                name="street"
                type="text"
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.formattedAddress &&
                  formik.touched.formattedAddress
                    ? true
                    : false
                }
                helperText={
                  formik.touched.formattedAddress &&
                  formik.errors.formattedAddress
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.formattedAddress}
                fullWidth
                label="Address Description"
                name="formattedAddress"
                type="text"
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.lng &&
                  formik.touched.lng
                    ? true
                    : false
                }
                helperText={
                  formik.touched.lng &&
                  formik.errors.lng
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lng}
                fullWidth
                label="Longitude"
                name="lng"
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  formik.errors.lat &&
                  formik.touched.lat
                    ? true
                    : false
                }
                helperText={
                  formik.touched.lat &&
                  formik.errors.lat
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lat}
                fullWidth
                label="Latitude"
                name="lat"
                type="number"
              />
            </Grid>
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
          {JSON.stringify(formik.errors, null, 2)}
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
