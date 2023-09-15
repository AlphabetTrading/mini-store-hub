import { gql } from "@apollo/client";
import { Gender, UserRole } from "../../../types/user";
export interface UpdateUserVars {
  data: {
    amharicLastName?: string;
    amharicFirstName?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    username?: string;
    gender?: Gender;
    userProfile?: {
      idUrl?: string;
      photoUrl?: string;
      address?: {
        amharicFormattedAddress?: string;
        city?: string;
        formattedAddress?: string;
        lat?: number;
        lng?: number;
        street?: string;
      };
    };
    password?: string;
  };
  updateUserbyIdId: string;
}
export interface UpdateUserData {
  updateUserbyId: {
    id: string;
  };
}
export const UPDATE_USER = gql`
  mutation UpdateUserbyId($data: UpdateUserInput!, $updateUserbyIdId: String!) {
    updateUserbyId(data: $data, id: $updateUserbyIdId) {
      id
    }
  }
`;

export interface RegisterUserVars {
  data: {
    firstName: string;
    lastName: string;
    password: string;
    phone: string;
    username: string;
  };
}
export interface RegisterUserData {
  signup: { user: { id: string } };
}

export const REGISTER_ADMIN = gql`
  mutation CreateADMIN($data: CreateUserInput!) {
    createADMIN(data: $data) {
      id
    }
  }
`;

export const REGISTER_WAREHOUSE_MANAGER = gql`
  mutation CreateWarehouseManager($data: CreateUserInput!) {
    createWarehouseManager(data: $data) {
      id
    }
  }
`;

export const REGISTER_RETAIL_SHOP_MANAGER = gql`
  mutation CreateRetailShopManager($data: CreateUserInput!) {
    createRetailShopManager(data: $data) {
      id
    }
  }
`;

export interface ChangeUserPasswordVars {
  newPassword: string;
  userId: string;
}

export const CHANGE_PASSWORD = gql`
  mutation ChangeUserPassword($newPassword: String!, $userId: String!) {
    changeUserPassword(newPassword: $newPassword, userId: $userId) {
      id
    }
  }
`;

export interface ToggleUserVars {
  userId: string;
}

export const DEACTIVATE_USER = gql`
  mutation DeactivateUser($userId: String!) {
    deactivateUser(userId: $userId) {
      id
    }
  }
`;

export const ACTIVATE_USER = gql`
  mutation ActivateUser($userId: String!) {
    activateUser(userId: $userId) {
      id
    }
  }
`;
