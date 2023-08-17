import React from "react";
import { PropertyList } from "../property-list";
import { Card, CardHeader, Typography } from "@mui/material";
import { PropertyListItem } from "../property-list-item";
import { Address } from "../../../types/address";

type Props = {
  idUrl?: string;
  address?: Address;
};

const UserOtherDetails = (props: Props) => {
  const { idUrl, address } = props;

  return (
    <Card>
      <CardHeader title="Other Details" />
      <PropertyList>
        <PropertyListItem divider label="User ID Card" value="No ID card">
          {idUrl && <img src={idUrl} height={170} />}
        </PropertyListItem>
        <PropertyListItem divider label="City" value={address?.city} />
        <PropertyListItem divider label="Street" value={address?.street} />
        <PropertyListItem
          divider
          label="Address description"
          value={address?.formattedAddress}
        />
        <PropertyListItem
          divider
          label="Address description (Amh)"
          value={address?.amharicFormattedAddress}
        />
        <PropertyListItem
          divider
          label="Coordinates"
          value={`${address?.lat}, ${address?.lng}`}
        />
      </PropertyList>
    </Card>
  );
};

export default UserOtherDetails;
