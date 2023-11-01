import { gql } from "@apollo/client";

export interface CreateProductVars {
  data: {
    // amharicDescription?: string;
    description: string;
    name: string;
    // amharicName?: string;
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
    activePriceId?: string;
    categoryId?: string;
    amharicDescription?: string;
    description?: string;
    unit?: string;
    amharicName?: string;
    name?: string;
  };
}

export interface UpdateProductData {
  updateProduct: {
    id: string;
  };
}

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $data: UpdateProductInput!
    $updateProductId: String!
  ) {
    updateProduct(data: $data, id: $updateProductId) {
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

export interface AddPriceHistoryData {
  id: string;
}

export interface AddPriceHistoryVars {
  priceHistory: {
    price: number;
    productId: string;
    purchasedPrice: number;
  };
}

export const ADD_PRICE_HISTORY = gql`
  mutation CreatePriceHistory($priceHistory: CreatePriceHistoryInput!) {
    createPriceHistory(priceHistory: $priceHistory) {
      id
    }
  }
`;
