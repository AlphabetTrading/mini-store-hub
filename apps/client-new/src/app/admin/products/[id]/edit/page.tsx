"use client";
import React, { useState } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  CREATE_PRODUCT,
  CreateProductData,
  CreateProductVars,
  UPDATE_PRODUCT,
  UpdateProductData,
  UpdateProductVars,
} from "@/graphql/products/mutations";
import { useMutation, useQuery } from "@apollo/client";
import {
  PRODUCT,
  PRODUCTS,
  ProductData,
  ProductVars,
} from "@/graphql/products/queries";
import { useRouter } from "next/navigation";
import { showAlert } from "@/helpers/showAlert";
import { UPLOAD_FILE, UploadFileData } from "@/graphql/file/mutations";
import ProductCreateEditForm, {
  ProductInputValues,
} from "@/components/products/product-create-edit-form";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [updateProduct, { data, loading, error }] = useMutation<
    UpdateProductData,
    UpdateProductVars
  >(UPDATE_PRODUCT);
  const {
    data: productData,
    error: productError,
    loading: productLoading,
  } = useQuery<ProductData, ProductVars>(PRODUCT, {
    variables: {
      productId: params.id,
    },
    onCompleted: (data) => {
      setInitialValues({
        unit: data?.product.unit || null,
        name: data?.product.name || "",
        amharicName: data?.product.amharicName || "",
        description: data?.product.description || "",
        amharicDescription: data?.product.amharicDescription || "",
        category: data?.product.category || null,
        photoUrl: data?.product.images[0] || "",
      });
      setPhoto(data?.product.images[0] || null);
    },
    onError(error) {
      console.log(error);
    },
    fetchPolicy: "cache-and-network",
  });

  const router = useRouter();
  const [photo, setPhoto] = useState<any>(
    productData?.product.images[0] || null
  );
  const [
    uploadPhoto,
    { error: uploadPhotoError, loading: uploadPhotoLoading },
  ] = useMutation<UploadFileData>(UPLOAD_FILE);
  const [initialValues, setInitialValues] = useState<ProductInputValues>();

  const onSubmit = async (
    values: ProductInputValues,
    helpers: FormikHelpers<ProductInputValues>
  ) => {
    if (photo && typeof photo !== "string") {
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

    await updateProduct({
      variables: {
        updateProductId: params.id,
        data: {
          name: values.name,
          amharicName: values.amharicName,
          categoryId: values.category!.id,
          description: values.description,
          amharicDescription: values.amharicDescription,
          unit: values.unit!,
          images: photo ? [values.photoUrl] : [],
        },
      },
      refetchQueries: [
        { query: PRODUCTS },
        { query: PRODUCT, variables: { productId: params.id } },
      ],
      onCompleted: () => {
        helpers.resetForm();
        showAlert("added a", "product");
        router.push("/admin/products");
      },
    });
  };

  return (
    initialValues && (
      <ProductCreateEditForm
        error={error}
        initialValues={initialValues}
        loading={loading}
        onSubmit={onSubmit}
        title="Edit"
        setPhoto={setPhoto}
        photo={photo}
      />
    )
  );
};

export default Page;
