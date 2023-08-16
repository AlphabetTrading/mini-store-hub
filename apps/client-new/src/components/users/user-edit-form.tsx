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
  Alert,
  AlertTitle,
} from "@mui/material";
import { Gender, User, UserRole } from "../../../types/user";
import {
  UpdateUserData,
  UpdateUserVars,
  UPDATE_USER,
} from "@/graphql/users/mutations";
import { USER } from "@/graphql/users/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import FileDropZone from "../file-drop-zone";
import { useEffect, useState } from "react";
import { UPLOAD_FILE, UploadFileData } from "@/graphql/file/mutations";

type Props = {
  user?: User;
};
interface Values {
  firstName: string;
  amharicFirstName: string;
  lastName: string;
  amharicLastName: string;
  role: UserRole;
  gender: Gender;
  phoneNumber: string;
  username: string;

  idUrl: string;
  photoUrl: string;

  city: string;
  formattedAddress: string;
  amharicFormattedAddress: string;
  password: string;
  street: string;
  lat: number;
  lng: number;
}
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  amharicFirstName: Yup.string().required("First name is required"),
  amharicLastName: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
  phoneNumber: Yup.string().matches(/^(09|07)\d{8}$/, 'Phone number must start with 09 or 07 and have 10 digits'),
  username: Yup.string().required("Username is required"),
});

export const UserEditForm = ({ user }: Props) => {
  const [updateUser, { data, loading, error }] = useMutation<
    UpdateUserData,
    UpdateUserVars
  >(UPDATE_USER);

  useEffect(() => {
    if (user?.userProfile?.idUrl) {
      setID(user?.userProfile?.idUrl);
    } else {
      setID(null);
    }
  }, [user?.userProfile?.idUrl]);

  useEffect(() => {
    if (user?.userProfile?.photoUrl) {
      setPhoto(user?.userProfile?.photoUrl);
    } else {
      setPhoto(null);
    }
  }, [user?.userProfile?.photoUrl]);

  const [photo, setPhoto] = useState<any>(null);
  const [ID, setID] = useState<any>(null);

  // const [photoUrl, setPhotoUrl] = useState(user?.userProfile?.photoUrl || "");
  // const [idUrl, setIdUrl] = useState(user?.userProfile?.idUrl || "");

  const router = useRouter();
  const [
    uploadPhoto,
    { error: uploadPhotoError, loading: uploadPhotoLoading },
  ] = useMutation<UploadFileData>(UPLOAD_FILE);
  const [uploadID, { error: uploadIDError, loading: uploadIDLoading }] =
    useMutation<UploadFileData>(UPLOAD_FILE);

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
    gender: user?.gender || Gender.MALE,

    idUrl: user?.userProfile?.idUrl || "",
    photoUrl: user?.userProfile?.photoUrl || "",
    password: user?.password || "",
    amharicFirstName: user?.amharicFirstName || "",
    amharicLastName: user?.amharicFirstName || "",
    amharicFormattedAddress:
      user?.userProfile?.address?.amharicFormattedAddress || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (photo && typeof photo !== "string") {
        await uploadPhoto({
          variables: {
            file: photo,
          },
          onCompleted: (data) => {
            console.log(data, "photo");
            values.photoUrl = data.uploadFile;
            // setPhotoUrl(data.uploadFile);
          },
        });
      }
      if (ID && typeof ID !== "string") {
        await uploadID({
          variables: {
            file: ID,
          },
          onCompleted: (data) => {
            console.log(data, "ID");
            values.idUrl = data.uploadFile;
            // setIdUrl(data.uploadFile);
          },
        });
      }
      if (!(uploadPhotoError || uploadIDError)) {
        // console.log(idUrl)
        // console.log(photoUrl)
        await updateUser({
          variables: {
            updateUserbyIdId: user?.id || "",
            data: {
              firstName: values.firstName,
              lastName: values.lastName,
              amharicFirstName: values.amharicFirstName,
              amharicLastName: values.amharicLastName,
              gender: values.gender,
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
                  amharicFormattedAddress: values.amharicFormattedAddress,
                },
                idUrl: ID ? values.idUrl : "",
                photoUrl: photo ? values.photoUrl : "",
              },
            },
          },
          onCompleted: (data) => {
            router.back();
          },
          refetchQueries: [USER],
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Card>
          <CardHeader title="Basic info" />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    formik.errors.firstName && formik.touched.firstName
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  helperText={formik.touched.gender && formik.errors.gender}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  fullWidth
                  label="Gender"
                  select
                  name="gender"
                >
                  {Object.values(Gender).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() +
                        option.slice(1).toLocaleLowerCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  error={
                    formik.errors.role && formik.touched.role ? true : false
                  }
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
                  error={
                    formik.errors.city && formik.touched.city ? true : false
                  }
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
                  error={formik.errors.lng && formik.touched.lng ? true : false}
                  helperText={formik.touched.lng && formik.errors.lng}
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
                  error={formik.errors.lat && formik.touched.lat ? true : false}
                  helperText={formik.touched.lat && formik.errors.lat}
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
        </Card>
        <Card>
          <CardHeader title="ዋና መረጃ" />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    formik.errors.amharicFirstName &&
                    formik.touched.amharicFirstName
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.amharicFirstName &&
                    formik.errors.amharicFirstName
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amharicFirstName}
                  //   defaultValue={user.firstName}
                  fullWidth
                  label="ስም"
                  name="amharicFirstName"
                  type="text"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    formik.errors.amharicLastName &&
                    formik.touched.amharicLastName
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.amharicLastName &&
                    formik.errors.amharicLastName
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amharicLastName}
                  //   defaultValue={user.firstName}
                  fullWidth
                  label="የአባት ስም"
                  name="amharicLastName"
                  type="text"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    formik.errors.amharicFormattedAddress &&
                    formik.touched.amharicFormattedAddress
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.amharicFormattedAddress &&
                    formik.errors.amharicFormattedAddress
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amharicFormattedAddress}
                  fullWidth
                  label="አድራሻ መግለጫ"
                  name="amharicFormattedAddress"
                  type="text"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upload Photo" />
          <CardContent sx={{ pt: 0 }}>
            <FileDropZone setFile={setPhoto} file={photo} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upload ID" />
          <CardContent sx={{ pt: 0 }}>
            <FileDropZone setFile={setID} file={ID} />
          </CardContent>
        </Card>
        {(uploadPhotoError || uploadIDError || error) && (
          <Alert color="error">
            <AlertTitle>Error</AlertTitle>
            {uploadPhotoError?.message ||
              uploadIDError?.message ||
              error?.message}
          </Alert>
        )}

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
      </Stack>
    </form>
  );
};
