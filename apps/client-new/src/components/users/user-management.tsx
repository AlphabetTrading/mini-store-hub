import {
  ACTIVATE_USER,
  DEACTIVATE_USER,
  ToggleUserVars,
} from "@/graphql/users/mutations";
import { USER } from "@/graphql/users/queries";
import { useMutation } from "@apollo/client";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  isActive: boolean;
  userId: string;
};

const UserManagement = ({ isActive, userId }: Props) => {
  const [activateAccount, { error: activateError, loading: activateLoading }] =
    useMutation<{}, ToggleUserVars>(ACTIVATE_USER);

  const [
    deactivateAccount,
    { error: deactivateError, loading: deactivateLoading },
  ] = useMutation<{}, ToggleUserVars>(DEACTIVATE_USER);
console.log(isActive)
  const router = useRouter();

  return (
    <Card>
      <CardHeader title="Data Management" />
      <CardContent sx={{ pt: 0 }}>
        <Button
          color={isActive ? "error" : "primary"}
          variant="outlined"
          disabled={activateLoading || deactivateLoading}
          onClick={async () => {
            if (isActive) {
              await deactivateAccount({
                variables: {
                  userId: userId,
                },
                refetchQueries: [USER],
              });
            } else {
              await activateAccount({
                variables: {
                  userId: userId,
                },
                refetchQueries: [USER],
              });
            }
          }}
        >
          {(activateLoading || deactivateLoading) && (
            <CircularProgress sx={{ mr: 1, color: "neutral.500" }} size={16} />
          )}

          {isActive ? "Deactivate Account" : "Activate Account"}
        </Button>
        <Box sx={{ mt: 1 }}>
          {isActive && (
            <Typography color="text.secondary" variant="body2">
              Please be aware that the user will not be able to perform any
              task.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
