import {  Card, CardActions, CardHeader, Chip } from "@mui/material";
import { PropertyList } from "../property-list";
import { PropertyListItem } from "../property-list-item";
import { useState } from "react";
import { Product } from "../../../types/product";

type Props = {
  product?: Product;
};
export const ProductBasicDetails = ({ product }: Props) => {
  const [open, setOpen] = useState(false);
  return (
      <Card>
        <CardHeader title="Basic Details" />
        <PropertyList>
          <PropertyListItem divider label="Name" value={product?.name} />
          <PropertyListItem
            divider
            label="የዕቃ ስም"
            value={product?.amharicName}
          />
          <PropertyListItem
            divider
            label="Serial Number"
            value={product?.serialNumber}
          />
          <PropertyListItem
            divider
            label="Category"
            value={product?.category.name}
          />
          <PropertyListItem divider label="Unit">
            <Chip label={product?.unit} />
          </PropertyListItem>

          <PropertyListItem
            divider
            label="Description"
            value={product?.description}
          />
          <PropertyListItem
            divider
            label="መግለጫ"
            value={product?.amharicDescription}
          />
        </PropertyList>
      </Card>
  );
};
