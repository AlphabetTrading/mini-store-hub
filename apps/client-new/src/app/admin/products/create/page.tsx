"use client";
import React, {useState } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  CREATE_PRODUCT,
  CreateProductData,
  CreateProductVars,
} from "@/graphql/products/mutations";
import {  useMutation } from "@apollo/client";
import { PRODUCTS } from "@/graphql/products/queries";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";
import { UPLOAD_FILE, UploadFileData } from "@/graphql/file/mutations";
import ProductCreateEditForm, {
  ProductInputValues,
} from "@/components/products/product-create-edit-form";

type Props = {};


const initialValues: ProductInputValues = {
  unit: null,
  name: "",
  amharicName: "",
  description: "",
  amharicDescription: "",
  category: null,
  photoUrl: "",
};

const Page = (props: Props) => {
  const [createProduct, { data, loading, error }] = useMutation<
    CreateProductData,
    CreateProductVars
  >(CREATE_PRODUCT);
  const router = useRouter();
  const [photo, setPhoto] = useState<any>(null);
  const [
    uploadPhoto,
    { error: uploadPhotoError, loading: uploadPhotoLoading },
  ] = useMutation<UploadFileData>(UPLOAD_FILE);

  const onSubmit = async (
    values: ProductInputValues,
    helpers: FormikHelpers<ProductInputValues>
  ) => {
    if (photo) {
      await uploadPhoto({
        variables: {
          file: photo,
        },
        onCompleted: (data) => {
          console.log(data, "photo");
          showAlert("uploaded a", "photo");
          values.photoUrl = data.uploadFile;
          // setPhotoUrl(data.uploadFile);
        },
      });
    }
    await createProduct({
      variables: {
        data: {
          name: values.name,
          amharicName: values.amharicName,
          categoryId: values.category!.id,
          description: values.description,
          amharicDescription: values.amharicDescription,
          unit: values.unit!,
          images: [values.photoUrl],
        },
      },
      refetchQueries: [{ query: PRODUCTS }],
      onCompleted: () => {
        helpers.resetForm();
        showAlert("added a", "product");
        router.push("/admin/products");
      },
    });
  };

  return (
    <ProductCreateEditForm
      error={error}
      initialValues={initialValues}
      loading={loading}
      onSubmit={onSubmit}
      title="Create"
      setPhoto={setPhoto}
      photo={photo}
    />
  );
};

export default Page;
