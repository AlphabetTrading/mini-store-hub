import { gql } from "@apollo/client";

export interface CreateProductVars {
  data: {
    description: string;
    name: string;
    unit: string;
    categoryId: string;
  };
}

export interface CreateProductData {
  id: string;
}

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
    }
  }
`;

export interface UpdateProductVars {
  updateProductId: string;
  data: {
    categoryId: string;
    description: string;
    unit: string;
    name: string;
  };
}

export interface UpdateProductData {
  id: string;
}

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $updateProductId: String!
    $data: CreateProductInput!
  ) {
    updateProduct(id: $updateProductId, data: $data) {
      id
    }
  }
`;

export interface DeleteProductVars {
  deleteProductId: string;
}

export interface DeleteProductData {
  id: string;
}

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: String!) {
    deleteProduct(id: $deleteProductId) {
      id
    }
  }
`;


export const ADD_PRICE_HISTORY = gql`
 mutation DeleteProduct($deleteProductId: String!) {
    deleteProduct(id: $deleteProductId) {
      id
    }
  }

`
