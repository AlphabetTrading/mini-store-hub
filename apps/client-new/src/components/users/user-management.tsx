import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {};

const UserManagement = (props: Props) => {
  return (
    <Card>
      <CardHeader title="Data Management" />
      <CardContent sx={{ pt: 0 }}>
        <Button color="error" variant="outlined">
          Delete Account
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color="text.secondary" variant="body2">
            Please be aware that what has been deleted can never be brought back
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
