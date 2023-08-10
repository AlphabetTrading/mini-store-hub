import { Button, Card, CardActions, CardHeader } from "@mui/material";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { User } from "../../../types/user";

type Props = {
  user?: User;
};
export const UserBasicDetails = ({ user }: Props) => {
  return (
    <Card>
      <CardHeader title="Basic Details" />
      <PropertyList>
        <PropertyListItem divider label="First name" value={user?.firstName} />
        <PropertyListItem divider label="Last name" value={user?.lastName} />
        <PropertyListItem divider label="Phone" value={user?.phone} />
        <PropertyListItem divider label="Username" value={user?.username} />
        <PropertyListItem
          divider
          label="City"
          value={user?.userProfile?.address?.city}
        />
        <PropertyListItem
          divider
          label="Street"
          value={user?.userProfile?.address?.street}
        />
        <PropertyListItem
          divider
          label="Formatted Address"
          value={user?.userProfile?.address?.formattedAddress}
        />
        <PropertyListItem
          divider
          label="Coordinates"
          value={`${user?.userProfile?.address?.lat}, ${user?.userProfile?.address?.lng}`}
        />
      </PropertyList>
      <CardActions>
        <Button color="inherit" size="small">
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
};
