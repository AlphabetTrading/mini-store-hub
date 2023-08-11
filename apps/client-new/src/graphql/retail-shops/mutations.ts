import { gql } from "@apollo/client";

export interface CreateRetailShopInput {
  data: {
    name: string;
    retailShopManagerId: string;
    address: {
      city: string;
      formattedAddress: string;
      lat: number;
      lng: number;
      street: string;
    };
  };
}
export interface CreateRetailShopData {
  createRetailShop: {
    id: string;
  };
}

export const CREATE_RETAIL_SHOP = gql`
  mutation CreateRetailShop($data: CreateRetailShopInput!) {
    createRetailShop(data: $data) {
      id
    }
  }
`;

export interface UpdateRetailShopVars {
  data: {
    address: {
      city: string;
      lat: number;
      lng: number;
      street: string;
      formattedAddress: string;
    };
    name: string;
    retailShopManagerId: string;
  };
  updateRetailShopId: string;
}

export interface UpdateRetailShopData {
  updateRetailShop: {
    id: string;
  };
}

export const UPDATE_RETAIL_SHOP = gql`
  mutation UpdateRetailShop(
    $data: UpdateRetailShopInput!
    $updateRetailShopId: String!
  ) {
    updateRetailShop(data: $data, id: $updateRetailShopId) {
      id
    }
  }
`;

export interface DeleteRetailShopVars {
  deleteRetailShopId: string;
}

export const DELETE_RETAIL_SHOP = gql`
  mutation DeleteRetailShop($deleteRetailShopId: String!) {
    deleteRetailShop(id: $deleteRetailShopId) {
      id
    }
  }
`;
