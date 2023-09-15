import { gql } from "@apollo/client";

export interface CreateRetailShopInput {
  data: {
    name: string;
    amharicName: string;
    retailShopManagerId?: string;
    address: {
      city: string;
      formattedAddress: string;
      amharicFormattedAddress: string;
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
      amharicFormattedAddress: string;
    };
    name: string;
    amharicName: string;
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

export interface DeactivateRetailShopVars {
  deactivateRetailShopId: string;
}

export interface ActivateRetailShopVars {
  activateRetailShopId: string;
}
export interface DeactivateRetailShopData {
  id: string;
  status: boolean;
}

export interface ActivateRetailShopData {
  id: string;
  status: boolean;
}

export const DEACTIVATE_RETAIL_SHOP = gql`
  mutation DeactivateRetailShop($deactivateRetailShopId: String!) {
    deactivateRetailShop(id: $deactivateRetailShopId) {
      id
      status
    }
  }
`;

export const ACTIVATE_RETAIL_SHOP = gql`
  mutation ActivateRetailShop($activateRetailShopId: String!) {
    activateRetailShop(id: $activateRetailShopId) {
      id
      status
    }
  }
`;
