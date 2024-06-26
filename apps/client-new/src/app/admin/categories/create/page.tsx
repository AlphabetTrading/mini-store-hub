"use client";
import BreadcrumbsSeparator from "@/components/breadcrumbs-separator";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CATEGORIES, CategoriesData } from "@/graphql/categories/queries";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Category } from "../../../../../types/categories";
import {
  CreateCategoryData,
  CreateCategoryVars,
  CREATE_CATEGORY,
} from "@/graphql/categories/mutations";
import { showAlert } from "@/helpers/showAlert";
import FileDropZone from "@/components/file-drop-zone";
import { UploadFileData, UPLOAD_FILE } from "@/graphql/file/mutations";

type Props = {};

const validationSchema = Yup.object({
  name: Yup.string().required("Category Name is required"),
  description: Yup.string().required("Category Description is required"),
  amharicName: Yup.string()
    .min(1, "ስም ከአንድ በላይ ፊደል መሆን አለበት")
    .max(30, "ስም ከ30 ፊደል መብለጥ የለበትም"),
  amharicDescription: Yup.string()
    .min(5, "መግለጫ ከአምስት በላይ ፊደል መሆን አለበት")
    .max(100, "ስም ከ100 ፊደል መብለጥ የለበትም"),
});

interface Values {
  name: string;
  amharicName: string;
  description: string;
  amharicDescription: string;
  parentCategory?: Category;
  imageUrl: string;
}

const initialValues: Values = {
  name: "",
  amharicName: "",
  description: "",
  amharicDescription: "",
  imageUrl: "",
};

const Page = (props: Props) => {
  const [createCategory, { data, loading }] = useMutation<
    CreateCategoryData,
    CreateCategoryVars
  >(CREATE_CATEGORY);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<CategoriesData>(CATEGORIES);
  const [photo, setPhoto] = useState<any>(null);
  const [
    uploadPhoto,
    { error: uploadPhotoError, loading: uploadPhotoLoading },
  ] = useMutation<UploadFileData>(UPLOAD_FILE);

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      if (photo) {
        await uploadPhoto({
          variables: {
            file: photo,
          },
          onCompleted: (data) => {
            showAlert("uploaded a", "photo");
            values.imageUrl = data.uploadFile;
          },
        });
      }
      await createCategory({
        variables: {
          data: {
            amharicName: values.amharicName,
            amharicDescription: values.amharicDescription,
            name: values.name,
            description: values.description,
            parentId: values.parentCategory?.id,
            image: values.imageUrl,
          },
        },
        refetchQueries: [CATEGORIES],
        onCompleted: () => {
          helpers.resetForm();
          showAlert("created a", "category");
          router.push("/admin/categories");
        },
      });
    },
  });
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h4">Create Category</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link component={NextLink} href={"/admin/dashboard"}>
                Dashboard
              </Link>
              <Link component={NextLink} href={"/admin/categories"}>
                Categories
              </Link>
              <Typography>Create</Typography>
            </Breadcrumbs>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6">Basic details</Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Stack spacing={3}>
                        <TextField
                          error={!!(formik.touched.name && formik.errors.name)}
                          fullWidth
                          helperText={formik.touched.name && formik.errors.name}
                          label="Category Name"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                        <TextField
                          error={
                            !!(
                              formik.touched.amharicName &&
                              formik.errors.amharicName
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.amharicName &&
                            formik.errors.amharicName
                          }
                          label="ስም"
                          name="amharicName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.amharicName}
                        />
                        <TextField
                          error={
                            !!(
                              formik.touched.description &&
                              formik.errors.description
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          label="Category Description"
                          name="description"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          multiline
                          rows={4}
                        />
                        <TextField
                          error={
                            !!(
                              formik.touched.amharicDescription &&
                              formik.errors.amharicDescription
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.amharicDescription &&
                            formik.errors.amharicDescription
                          }
                          label="መግለጫ"
                          name="amharicDescription"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.amharicDescription}
                          multiline
                          rows={4}
                        />
                        <Stack direction="row" spacing={3}>
                          {categoryLoading ? <CircularProgress /> : null}
                          <TextField
                            error={
                              !!(
                                formik.touched.parentCategory &&
                                formik.errors.parentCategory
                              )
                            }
                            fullWidth
                            helperText={
                              formik.touched.parentCategory &&
                              formik.errors.parentCategory
                            }
                            label="Parent Category"
                            name="parentCategory"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.parentCategory?.name}
                            select
                          >
                            {categoryData
                              ? categoryData.categories.items.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                ))
                              : []}
                          </TextField>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Upload Photo" />
                <CardContent sx={{ pt: 0 }}>
                  <FileDropZone setFile={setPhoto} file={photo} />
                </CardContent>
              </Card>

              <Stack
                direction="row"
                alignContent="center"
                justifyContent="flex-end"
                spacing={1}
              >
                <Button color="inherit" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit" variant="contained">
                  {loading && (
                    <CircularProgress
                      sx={{
                        color: "neutral.400",
                        // display: loading ? "block" : "none",
                        width: "25px !important",
                        height: "25px !important",
                        mr: 1,
                      }}
                    />
                  )}
                  Create
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
