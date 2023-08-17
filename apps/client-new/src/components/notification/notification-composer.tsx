import {  useEffect, useState } from "react";

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
  recipient: Yup.object(),
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
        <Box></Box>
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
            <IconButton onClick={onClose}>
              <SvgIcon>
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          </Box>
          <Autocomplete
            sx={{ width: 300 }}
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
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched.recipient && formik.errors.recipient
                    ? true
                    : false
                }
                helperText={formik.touched.recipient && formik.errors.recipient}
                name="recipient"
                label="Recipient"
                InputProps={{
                  ...params.InputProps,
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

          <TextField
            error={
              formik.errors.recipientType && formik.touched.recipientType
                ? true
                : false
            }
            helperText={
              formik.touched.recipientType && formik.errors.recipientType
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recipientType}
            fullWidth
            label="Recipient Type"
            select
            name="recipientType"
          >
            {Object.values(RecipientType).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            error={formik.errors.title && formik.touched.title ? true : false}
            helperText={formik.touched.title && formik.errors.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            name="title"
            fullWidth
            label="Title"
          />

          <TextField
            placeholder="Leave a message"
            sx={{
              border: "none",
              flexGrow: 1,
            }}
            error={formik.errors.body && formik.touched.body ? true : false}
            helperText={formik.touched.body && formik.errors.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
            name="body"
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
