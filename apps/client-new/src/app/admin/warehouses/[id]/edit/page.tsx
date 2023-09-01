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
  WAREHOUSES,
  WarehouseData,
  WarehouseVars,
} from "@/graphql/warehouses/queries";
import { showAlert } from "@/helpers/showAlert";
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
    { data: updateData, loading: updateLoading, error: updateError, reset },
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
    amharicFormattedAddress:
      data?.warehouse?.address?.amharicFormattedAddress || "",
    lat: data?.warehouse?.address?.lat || 0,
    lng: data?.warehouse?.address?.lng || 0,
    name: data?.warehouse?.name || "",
    amharicName: data?.warehouse?.amharicName || "",
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
            amharicFormattedAddress: values.amharicFormattedAddress,
            lat: values.lat,
            lng: values.lng,
            street: values.street,
          },
          name: values.name,
          amharicName: values.amharicName,
          warehouseManagerId: values?.warehouseManager?.id || "",
        },
        updateWarehouseId: params.id,
      },
      refetchQueries: [
        { query: WAREHOUSES },
        { query: WAREHOUSE, variables: { warehouseId: params.id } },
      ],
      onCompleted: () => {
        helpers.resetForm();
        showAlert("edited a", "warehouse");
        router.back();
      },
      onError(error) {
        setTimeout(() => {
          reset();
        }, 3000);
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
