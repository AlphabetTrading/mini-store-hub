import {
  CHANGE_PASSWORD,
  ChangeUserPasswordVars,
  UPDATE_USER,
  UpdateUserData,
  UpdateUserVars,
} from "@/graphql/users/mutations";
import { useMutation } from "@apollo/client";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { UserRole } from "../../../types/user";

type Props = {
  open: boolean;
  handleClose: () => void;
  userId: string;
};

interface Values {
  password: string;
}

const initialValues: Values = {
  password: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
});

const ChangePassword = (props: Props) => {
  const { open, handleClose, userId } = props;

  const [updatePassword, { error, reset, loading }] = useMutation<
    {},
    ChangeUserPasswordVars
  >(CHANGE_PASSWORD);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      updatePassword({
        variables: {
          userId,
          newPassword: values.password,
        },
        onCompleted: (data) => {
          reset();
          handleClose();
          formikHelpers.resetForm();
        },
      });
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={12}
          sx={{
            position: "absolute" as "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: 400,
            maxHeight: 300,
            m: "auto",
            px: 4,
          }}
        >
          <Stack height="100%" justifyContent="center" spacing={2}>
            <Typography variant="h6">Change Password</Typography>

            {/* <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
              <InputLabel  >
                Password
              </InputLabel>
              <OutlinedInput
                //  helperText={formik.touched.password && formik.errors.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                // label="Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText >
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
              
            </FormControl> */}
            <TextField
              label="Password"
              type="text"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              helperText={formik.touched.password && formik.errors.password}
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
            />

            <Button
              disabled={loading}
              fullWidth
              variant="contained"
              type="submit"
            >
              {loading && (
                <CircularProgress
                  size={16}
                  sx={{ mr: 1, color: "neutral.500" }}
                />
              )}
              Submit
            </Button>
            {error && (
              <Alert color="error">
                <AlertTitle>Error</AlertTitle>
                {error.message}
              </Alert>
            )}
          </Stack>
        </Paper>
      </form>
    </Modal>
  );
};

export default ChangePassword;
