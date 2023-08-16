import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { User } from "../../../types/user";
import ChangePasswordModal from "../modals/change-password-modal";
import { useState } from "react";

type Props = {
  user?: User;
};
export const UserBasicDetails = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChangePasswordModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        userId={user?.id || ""}
      />
      <Card>
        <CardHeader title="Basic Details" />
        <PropertyList>
          <PropertyListItem
            divider
            label="First name"
            value={user?.firstName}
          />
          <PropertyListItem
            divider
            label="First name (Amh)"
            value={user?.amharicFirstName}
          />

          <PropertyListItem divider label="Last name" value={user?.lastName} />
          <PropertyListItem
            divider
            label="Last name (Amh)"
            value={user?.amharicLastName}
          />
          <PropertyListItem divider label="Gender" value={user?.gender} />

          <PropertyListItem divider label="Phone" value={user?.phone} />
          <PropertyListItem divider label="Username" value={user?.username} />

        </PropertyList>
        <CardActions>
          <Button onClick={() => setOpen(true)} size="small">
            Reset Password
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
