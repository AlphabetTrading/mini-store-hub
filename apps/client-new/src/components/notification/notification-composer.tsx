import { useEffect, useState } from "react";

import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Portal,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { User } from "../../../types/user";
import * as Yup from "yup";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UsersData, USERS } from "@/graphql/users/queries";
import {
  SEND_NOTIFICATION,
  SendNotificationVars,
} from "@/graphql/notifications/mutations";
import { RecipientType } from "../../../types/notification";
import {
  ALL_NOTIFICATIONS,
  NOTIFICATIONS_BY_USERID,
} from "@/graphql/notifications/queries";
type Props = {
  onClose: () => void;
  open: boolean;
};

interface Values {
  body: string;
  title: string;
  recipient: User | null;
  recipientType: RecipientType | null;
}
const initialValues: Values = {
  body: "",
  title: "",
  recipient: null,
  recipientType: RecipientType.USER,
};

const validationSchema = Yup.object().shape({
  body: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  recipient: Yup.object().nullable(),
  // recipient: Yup.object().required("Required"),
  recipientType: Yup.string().required("Required"),
});

export const NotificationComposer = ({ onClose, open }: Props) => {
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [getUsers, { loading: usersLoading }] = useLazyQuery<UsersData>(USERS);

  useEffect(() => {
    if (openAutocomplete) {
      (async () => {
        await getUsers({
          onCompleted: (data) => {
            setOptions(data.users.items);
          },
        });
      })();
    }
  }, [openAutocomplete]);

  const [sendNotification, { loading, error }] = useMutation<
    {},
    SendNotificationVars
  >(SEND_NOTIFICATION);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validate(values) {
      let errors: any = {};
      if (values.recipientType===RecipientType.USER && !values.recipient) {
        errors.recipient = "Required";
      }
      return errors;
    },
    onSubmit: async (values, formikHelpers) => {
      await sendNotification({
        variables: {
          data: {
            body: values.body,
            title: values.title,
            recipientId: values.recipient?.id,
            recipientType: values.recipientType!,
          },
        },
        onCompleted: () => {
          formikHelpers.resetForm();
          onClose();
        },
        refetchQueries: [NOTIFICATIONS_BY_USERID, ALL_NOTIFICATIONS],
      });
    },
  });
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Paper
        sx={{
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          margin: 3,
          maxHeight: (theme) => `calc(100% - ${theme.spacing(6)})`,
          maxWidth: (theme) => `calc(100% - ${theme.spacing(6)})`,
          minHeight: 500,
          outline: "none",
          position: "fixed",
          right: 0,
          width: 600,
          zIndex: 150,
          overflow: "hidden",
        }}
        elevation={12}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="h6">New Message</Typography>

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
            >
              <SvgIcon>
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          </Box>
          <Box sx={{ pl: 1.5, py: 1, flexGrow: 1, display: "flex" }}>
            <Autocomplete
              // sx={{ width: 300 }}

              fullWidth
              open={openAutocomplete}
              onOpen={() => {
                setOpenAutocomplete(true);
              }}
              onClose={() => {
                setOpenAutocomplete(false);
              }}
              value={formik.values.recipient}
              onChange={(event: any, newValue: User | null) => {
                formik.setFieldValue("recipient", newValue);
              }}
              isOptionEqualToValue={(option, value) =>
                option.firstName === value.firstName
              }
              getOptionLabel={(option) => option.firstName}
              options={options}
              loading={usersLoading}
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    formik.touched.recipient && formik.errors.recipient
                      ? true
                      : false
                  }
                  onChange={formik.handleChange}
                  variant="standard"
                  helperText={
                    formik.touched.recipient && formik.errors.recipient
                  }
                  name="recipient"
                  placeholder="Recipient"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    endAdornment: (
                      <>
                        {usersLoading ? (
                          <CircularProgress
                            sx={{ color: "neutral.500" }}
                            size={20}
                          />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Divider />
          <Box sx={{ pl: 1.5, py: 1, flexGrow: 1, display: "flex" }}>
            <TextField
              InputProps={{ disableUnderline: true }}
              variant="standard"
              error={
                formik.errors.recipientType && formik.touched.recipientType
                  ? true
                  : false
              }
              helperText={
                formik.touched.recipientType && formik.errors.recipientType
              }
              value={formik.values.recipientType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              placeholder="Recipient Type"
              select
              name="recipientType"
            >
              {Object.values(RecipientType).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Divider />
          <TextField
            variant="standard"
            error={formik.errors.title && formik.touched.title ? true : false}
            helperText={formik.touched.title && formik.errors.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            name="title"
            fullWidth
            placeholder="Title"
            // label="Title"
            sx={{ py: 1.5, pl: 1 }}
            InputProps={{ disableUnderline: true }}
          />
          <Divider />
          <TextField
            variant="standard"
            fullWidth
            placeholder="Leave a message"
            sx={{
              border: "none",
              flexGrow: 1,
              py: 1.5,
              pl: 1,
            }}
            error={formik.errors.body && formik.touched.body ? true : false}
            helperText={formik.touched.body && formik.errors.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
            name="body"
            multiline
            rows={6}
            InputProps={{ disableUnderline: true }}
          />
          <Divider />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
            sx={{ p: 2 }}
          >
            <div>
              <Button
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting && (
                  <CircularProgress
                    sx={{ color: "neutral.500", mr: 1 }}
                    size={16}
                  />
                )}
                Send
              </Button>
            </div>
          </Stack>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error?.message}
            </Alert>
          )}
        </form>
      </Paper>
    </Portal>
  );
};
