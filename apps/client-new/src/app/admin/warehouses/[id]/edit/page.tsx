"use client";
import StateHandler from "@/components/state-handler";
import WarehouseCreateEditForm, {
  WarehouseInputValues,
} from "@/components/warehouses/warehouse-create-edit-form";
import {
  UPDATE_WAREHOUSE,
  UpdateWarehouseData,
  UpdateWarehouseVars,
} from "@/graphql/warehouses/mutations";
import {
  WAREHOUSE,
  WarehouseData,
  WarehouseVars,
} from "@/graphql/warehouses/queries";
import { useMutation, useQuery } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  const [
    updateWarehouse,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation<UpdateWarehouseData, UpdateWarehouseVars>(UPDATE_WAREHOUSE);

  const { data, loading, error } = useQuery<WarehouseData, WarehouseVars>(
    WAREHOUSE,
    {
      variables: {
        warehouseId: params.id,
      },
    }
  );

  const initialValues: WarehouseInputValues = {
    city: data?.warehouse?.address?.city || "",
    formattedAddress: data?.warehouse?.address?.formattedAddress || "",
    lat: data?.warehouse?.address?.lat || 0,
    lng: data?.warehouse?.address?.lng || 0,
    name: data?.warehouse?.name || "",
    street: data?.warehouse?.address?.street || "",
    warehouseManager: data?.warehouse?.warehouseManager || null,
  };

  const onSubmit = async (
    values: WarehouseInputValues,
    helpers: FormikHelpers<WarehouseInputValues>
  ) => {
    await updateWarehouse({
      variables: {
        data: {
          address: {
            city: values.city,
            formattedAddress: values.formattedAddress,
            lat: values.lat,
            lng: values.lng,
            street: values.street,
          },
          name: values.name,
          warehouseManagerId: values?.warehouseManager?.id || "",
        },
        updateWarehouseId: params.id,
      },
      refetchQueries: [WAREHOUSE],
      onCompleted: () => {
        helpers.resetForm();
        router.back();
      },
    });
  };
  return (
    <StateHandler loading={loading} error={error} empty={false}>
      <WarehouseCreateEditForm
        onSubmit={onSubmit}
        error={updateError}
        initialValues={initialValues}
        loading={updateLoading}
        title="Update"
      />
    </StateHandler>
  );
};

export default Page;
