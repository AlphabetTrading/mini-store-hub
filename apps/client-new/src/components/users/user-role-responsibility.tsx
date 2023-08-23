import React from "react";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { Card, CardHeader } from "@mui/material";
import { UserRole } from "../../../types/user";
import { Warehouse } from "../../../types/warehouse";
import { RetailShop } from "../../../types/retail-shop";
import CustomChip from "../custom-chip";
import formatEnumValue from "@/helpers/formatEnum";
import dayjs from "dayjs";

type Props = {
  role?: UserRole;
  warehouses?: Warehouse[];
  retailShops?: RetailShop[];
  createdAt?: Date;
};

const UserRoleResponsibility = (props: Props) => {
  const { role, warehouses, retailShops, createdAt } = props;
  return (
    <Card>
      <CardHeader title="Roles and Responsibilities" />
      <PropertyList>
        <PropertyListItem divider label="Role">
          <CustomChip label={formatEnumValue(role || UserRole.USER)} />
        </PropertyListItem>
        {warehouses && warehouses.length > 0 && (
          <PropertyListItem
            divider
            label="Warehouse"
            value={warehouses[0].name}
          />
        )}
        {retailShops && retailShops.length > 0 && (
          <PropertyListItem
            divider
            label="Retail Shop"
            value={retailShops[0].name}
          />
        )}
        <PropertyListItem
          divider
          label="User Created At"
          value={dayjs(createdAt).format("MMMM DD, YYYY")}
        />
      </PropertyList>
    </Card>
  );
};

export default UserRoleResponsibility;
