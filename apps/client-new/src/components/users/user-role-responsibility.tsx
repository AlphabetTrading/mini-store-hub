import React from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { Card, CardHeader } from "@mui/material";
import { UserRole } from "../../../types/user";

type Props = {
  role?: UserRole;
  warehouseName?: string;
  retailShopName?: string;
  createdAt?: Date;
};

const UserRoleResponsibility = (props: Props) => {
  const { role, warehouseName, retailShopName, createdAt } = props;
  return (
    <Card>
      <CardHeader title="Roles and Responsibilities" />
      <PropertyList>
        <PropertyListItem divider label="Role" value={role} />
        {warehouseName && (
          <PropertyListItem divider label="Warehouse" value={warehouseName} />
        )}
        {retailShopName && (
          <PropertyListItem
            divider
            label="Retail Shop"
            value={retailShopName}
          />
        )}
        <PropertyListItem divider label="User Created At" value={createdAt} />

      </PropertyList>
    </Card>
  );
};

export default UserRoleResponsibility;
