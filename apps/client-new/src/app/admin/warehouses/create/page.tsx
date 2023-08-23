"use client";
import React from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  CREATE_WAREHOUSE,
  CreateWarehouseData,
  CreateWarehouseVars,
} from "@/graphql/warehouses/mutations";
import { WAREHOUSES } from "@/graphql/warehouses/queries";
import WarehouseCreateEditForm, {
  WarehouseInputValues,
} from "@/components/warehouses/warehouse-create-edit-form";
import { showAlert } from "@/helpers/showAlert";

type Props = {};

const initialValues: WarehouseInputValues = {
  name: "",
  amharicName: "",
  formattedAddress: "",
  amharicFormattedAddress: "",
  city: "",
  street: "",
  lat: 0,
  lng: 0,
  warehouseManager: null,
};

const Page = (props: Props) => {
  const router = useRouter();
  const [
    createWarehouse,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation<CreateWarehouseData, CreateWarehouseVars>(CREATE_WAREHOUSE);

  const onSubmit = async (
    values: WarehouseInputValues,
    helpers: FormikHelpers<WarehouseInputValues>
  ) => {
    await createWarehouse({
      variables: {
        data: {
          name: values.name,
          amharicName: values.amharicName,
          warehouseManagerId: values?.warehouseManager?.id || "",
          address: {
            formattedAddress: values.formattedAddress,
            amharicFormattedAddress: values.amharicFormattedAddress,
            city: values.city,
            street: values.street,
            lat: values.lat,
            lng: values.lng,
          },
        },
      },
      refetchQueries: [WAREHOUSES],
      onCompleted: () => {
        helpers.resetForm();
        showAlert("added a", "warehouse");
        router.push("/admin/warehouses");
      },
    });
  };

  return (
    <WarehouseCreateEditForm
      onSubmit={onSubmit}
      error={createError}
      initialValues={initialValues}
      loading={createLoading}
      title="Create"
    />
  );
};

export default Page;
