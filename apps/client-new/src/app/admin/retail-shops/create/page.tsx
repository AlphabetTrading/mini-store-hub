"use client";
import RetailShopCreateEditForm, {
  RetailShopInputValues,
} from "@/components/retail-shops/retail-shop-create-edit-form";
import {
  CREATE_RETAIL_SHOP,
  CreateRetailShopData,
  CreateRetailShopInput,
} from "@/graphql/retail-shops/mutations";
import { RETAIL_SHOPS } from "@/graphql/retail-shops/queries";
import { showAlert } from "@/helpers/showAlert";
import { useMutation } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const initialValues: RetailShopInputValues = {
  name: "",
  amharicName: "",
  formattedAddress: "",
  amharicFormattedAddress: "",
  city: "",
  street: "",
  lat: 0,
  lng: 0,
  retailShopManager: null,
};

const Page = (props: Props) => {
  const router = useRouter();
  const [createRetailShop, { data, error, loading }] = useMutation<
    CreateRetailShopData,
    CreateRetailShopInput
  >(CREATE_RETAIL_SHOP);

  const onSubmit = async (
    values: RetailShopInputValues,
    helpers: FormikHelpers<RetailShopInputValues>
  ) => {
    await createRetailShop({
      variables: {
        data: {
          name: values.name,
          amharicName: values.amharicName,
          retailShopManagerId: values.retailShopManager?.id || undefined,
          address: {
            city: values.city,
            amharicFormattedAddress: values.amharicFormattedAddress,
            formattedAddress: values.formattedAddress,
            lat: values.lat,
            lng: values.lng,
            street: values.street,
          },
        },
      },
      refetchQueries: [{ query: RETAIL_SHOPS }],
      onCompleted: () => {
        helpers.resetForm();
        showAlert("created a", "retail shop");
        router.push("/admin/retail-shops");
      },
    });
  };
  return (
    <RetailShopCreateEditForm
      error={error}
      initialValues={initialValues}
      onSubmit={onSubmit}
      loading={loading}
      title="Create"
    />
  );
};

export default Page;
