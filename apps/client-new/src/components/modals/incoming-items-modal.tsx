import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControlLabel,
  Input,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ITEMS, ItemsData } from "@/graphql/items/queries";
import { useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleAddItem: (item: any) => void;
};
interface Values {
  itemId: string;
  quantity: number;
}
const initialValues: Values = {
  itemId: "",
  quantity: 0,
};
const validationSchema = Yup.object({
  itemId: Yup.string().required("Item is required"),
  quantity: Yup.number()
    .min(1, "Quantity cannot be less than 1")
    .required("Quantity is required"),
});

export const AddIncomingItemModal = (props: Props) => {
  const { open, handleClose, handleAddItem } = props;
  const { data, loading, error } = useQuery<ItemsData>(ITEMS);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      const selectedItem = data?.products.items.find(
        (item) => item.id === values.itemId
      );
      handleAddItem({ selectedItem, quantity: values.quantity });
      handleClose();
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
            maxWidth: 520,
            maxHeight: 600,
            m: "auto",
          }}
        >
          <Stack spacing={2} sx={{ p: 8 }}>
            <Card>
              <Stack
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
                direction="row"
              >
                <SvgIcon>
                  <SearchIcon />
                </SvgIcon>
                <Input disableUnderline placeholder="Search by product name" />
              </Stack>
              <Divider />

              {loading ? (
                <CircularProgress />
              ) : error || !data ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
              ) : (
                <RadioGroup
                  name="itemId"
                  value={formik.values.itemId.toString()}
                  onChange={(event) => {
                    formik.setFieldValue("itemId", event.currentTarget.value);
                  }}
                >
                  {[...data?.products.items].map((item, idx) => {
                    const isDisabled = false;
                    return (
                      <Paper
                        key={idx}
                        sx={{
                          alignItems: "flex-start",
                          display: "flex",
                          p: 2,
                        }}
                        variant="outlined"
                      >
                        <FormControlLabel
                          control={<Radio />}
                          disabled={isDisabled}
                          label={
                            <Box sx={{ ml: 2 }}>
                              <Typography
                                sx={{
                                  color: isDisabled
                                    ? "action.disabled"
                                    : "text.primary",
                                }}
                                variant="subtitle2"
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: isDisabled
                                    ? "action.disabled"
                                    : "text.secondary",
                                }}
                                variant="body2"
                              >
                                {item.serialNumber}
                              </Typography>
                            </Box>
                          }
                          value={item.id}
                        />
                      </Paper>
                    );
                  })}
                </RadioGroup>
              )}
            </Card>

            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              helperText={formik.touched.quantity && formik.errors.quantity}
              error={
                formik.touched.quantity && formik.errors.quantity ? true : false
              }
            />
            <Button type="submit">Add</Button>
          </Stack>
        </Paper>
      </form>
      {/* </Box> */}
    </Modal>
  );
};
