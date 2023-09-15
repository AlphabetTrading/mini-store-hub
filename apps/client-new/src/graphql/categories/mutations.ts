import { gql } from "@apollo/client";

export interface CreateCategoryVars {
  data: {
    name: string;
    description: string;
    amharicDescription: string;
    amharicName: string;
    parentId?: string;
    image?: string;
  };
}

export interface CreateCategoryData {
  createCategory: {
    id: string;
  };
}

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
    }
  }
`;

export interface UpdateCategoryVars {
  data: {
    name?: string;
    description?: string;
    amharicDescription?: string;
    amharicName?: string;
    parentId?: string;
    image?: string;
  };
  updateCategoryId: string;
}

export interface UpdateCategoryData {
  id: string;
}

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $data: UpdateCategoryInput!
    $updateCategoryId: String!
  ) {
    updateCategory(data: $data, id: $updateCategoryId) {
      id
    }
  }
`;

export interface DeleteCategoryVars {
  deleteCategoryId: string;
}

export interface DeleteCategoryData {
  id: string;
}

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId) {
      id
    }
  }
`;
