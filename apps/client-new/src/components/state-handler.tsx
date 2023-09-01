import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  loading: boolean;
  error: any;
  empty: boolean;
  children: React.ReactNode;
};

const StateHandler = (props: Props) => {
  if (props.loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ pb: 4, pt: 2 }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (props.error) {
    return (
      <Alert color="error">
        <AlertTitle>Error</AlertTitle>
        {props.error.message}
      </Alert>
    );
  }
  if (props.empty) {
    return (
      <Typography
        sx={{
          pl: 2,
        }}
        variant="body2"
      >
        No Records
      </Typography>
    );
  }
  return <>{props.children}</>;
};

export default StateHandler;
