import { gql } from "@apollo/client";

export interface RegisterIncomingStockVars {
  data: {
    goods: {
      productId: string;
      quantity: number;
    }[];
    destinationWarehouseId: string;
  };
}

export interface RegisterIncomingStockData {
  createGoodsTransferFromMainWarehouseToWarehouse: {
    id: string;
  };
}

export const REGISTER_INCOMING_STOCK = gql`
  mutation CreateGoodsTransferFromMainWarehouseToWarehouse(
    $data: CreateGoodsTransferFromMainWarehouseInput!
  ) {
    createGoodsTransferFromMainWarehouseToWarehouse(data: $data) {
      id
    }
  }
`;

export interface CreateWarehouseVars {
  data: {
    name: string;
    amharicName?: string;
    warehouseManagerId?: string;
    address?: {
      city?: string;
      formattedAddress?: string;
      amharicFormattedAddress?: string;
      lat?: number;
      lng?: number;
      street?: string;
    };
  };
}

export interface CreateWarehouseData {
  createWarehouse: {
    id: string;
  };
}
export const CREATE_WAREHOUSE = gql`
  mutation CreateWarehouse($data: CreateWarehouseInput!) {
    createWarehouse(data: $data) {
      id
    }
  }
`;

export interface UpdateWarehouseVars {
  data: {
    address: {
      city: string;
      formattedAddress: string;
      amharicFormattedAddress?: string;
      lat: number;
      lng: number;
      street: string;
    };
    name: string;
    amharicName?: string;
    warehouseManagerId: string;
  };
  updateWarehouseId: string;
}

export interface UpdateWarehouseData {
  updateWarehouse: {
    id: string;
  };
}

export const UPDATE_WAREHOUSE = gql`
  mutation UpdateWarehouse(
    $data: UpdateWarehouseInput!
    $updateWarehouseId: String!
  ) {
    updateWarehouse(data: $data, id: $updateWarehouseId) {
      id
    }
  }
`;

export interface ActivateWarehouseVars {
  activateWarehouseId: string;
}
export interface ActivateWarehouseData {
  activateWarehouse: {
    id: string;
    status: boolean;
  };
}

export interface DeactivateWarehouseVars {
  deactivateWarehouseId: string;
}
export interface DeactivateWarehouseData {
  deactivateWarehouse: {
    id: string;
    status: boolean;
  };
}

export const ACTIVATE_WAREHOUSE = gql`
  mutation ActivateWarehouse($activateWarehouseId: String!) {
    activateWarehouse(id: $activateWarehouseId) {
      id
      status
    }
  }
`;

export const DEACTIVATE_WAREHOUSE = gql`
  mutation DeactivateWarehouse($deactivateWarehouseId: String!) {
    deactivateWarehouse(id: $deactivateWarehouseId) {
      id
      status
    }
  }
`;
