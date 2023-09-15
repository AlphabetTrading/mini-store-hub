import React from "react";
import { Category } from "../../../types/categories";
import { Card, CardHeader } from "@mui/material";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";

type Props = {
  category: Category | undefined;
};

const CategoryBasicDetails = ({ category }: Props) => {
  return (
    <Card>
      <CardHeader title="Basic Details" />
      <PropertyList>
        <PropertyListItem
          divider
          label="Category Name"
          value={category?.name}
        />
        <PropertyListItem
          divider
          label="የምድብ ስም"
          value={category?.amharicName}
        />
        <PropertyListItem
          divider
          label="Description"
          value={category?.description}
        />
        <PropertyListItem
          divider
          label="መግለጫ"
          value={category?.amharicDescription}
        />
      </PropertyList>
    </Card>
  );
};

export default CategoryBasicDetails;
