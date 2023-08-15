import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";
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
    return <div>No Records</div>;
  }
  return <>{props.children}</>;
};

export default StateHandler;
