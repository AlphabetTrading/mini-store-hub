"use client"
import RetailShopCreateEditForm, {
  RetailShopInputValues,
} from "@/components/retail-shops/retail-shop-create-edit-form";
import StateHandler from "@/components/state-handler";
import {
  UPDATE_RETAIL_SHOP,
  UpdateRetailShopData,
  UpdateRetailShopVars,
} from "@/graphql/retail-shops/mutations";
import {
  RETAIL_SHOP,
  RetailShopData,
  RetailShopVars,
} from "@/graphql/retail-shops/queries";
import { useMutation, useQuery } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  const [
    updateRetailShop,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation<UpdateRetailShopData, UpdateRetailShopVars>(
    UPDATE_RETAIL_SHOP
  );

  const { data, loading, error } = useQuery<RetailShopData, RetailShopVars>(
    RETAIL_SHOP,
    {
      variables: {
        retailShopId: params.id,
      },
    }
  );

  const initialValues: RetailShopInputValues = {
    city: data?.retailShop?.address?.city || "",
    formattedAddress: data?.retailShop?.address?.formattedAddress || "",
    lat: data?.retailShop?.address?.lat || 0,
    lng: data?.retailShop?.address?.lng || 0,
    name: data?.retailShop?.name || "",
    street: data?.retailShop?.address?.street || "",
    retailShopManager: data?.retailShop?.retailShopManager || null,
  };

  const onSubmit = async (
    values: RetailShopInputValues,
    helpers: FormikHelpers<RetailShopInputValues>
  ) => {
    await updateRetailShop({
      variables: {
        updateRetailShopId: params.id,
        data: {
          name: values.name,
          retailShopManagerId: values.retailShopManager?.id || "",
          address: {
            city: values.city,
            formattedAddress: values.formattedAddress,
            lat: values.lat,
            lng: values.lng,
            street: values.street,
          },
        },
      },
      refetchQueries: [RETAIL_SHOP],
      onCompleted: () => {
        helpers.resetForm();
        router.back();
      },
    });
  };

  return (
    <StateHandler empty={false} error={error} loading={loading}>
    <RetailShopCreateEditForm
      error={updateError}
      initialValues={initialValues}
      onSubmit={onSubmit}
      loading={updateLoading}
      title="Edit"
    />
    </StateHandler>
  );
};

export default Page;
