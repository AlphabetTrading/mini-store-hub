import { gql } from "@apollo/client";
import { User, UserRole } from "../../../types/user";
import { Meta } from "../../../types/common";

export const GET_ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      username
      phone
      role
      updatedAt
      role
      warehouse {
        s
        id
      }
    }
  }
`;
export interface UsersVars {
  filterUserInput?: {
    firstName?: {
      contains: string;
    };
    lastName?: {
      contains: string;
    };
    phone?: {
      contains: string;
    };
    role?: UserRole;
  };
  paginationInput?: {
    take?: number;
    skip?: number;
  };
  orderBy?: {
    firstName?: string;
    createdAt?: string;
    lastName?: string;
    phone?: string;
    updatedAt?: string;
  };
}
export interface UsersData {
  users: {
    items: User[];
    meta: Meta;
  };
}

export const USERS = gql`
  query Users(
    $filterUserInput: FilterUserInput
    $orderBy: OrderByUserInput
    $paginationInput: PaginationInput
  ) {
    users(
      filterUserInput: $filterUserInput
      orderBy: $orderBy
      paginationInput: $paginationInput
    ) {
      items {
        id
        firstName
        lastName
        phone
        role
        userProfile {
          address {
            city
            street
            lat
            lng
          }
          photoUrl
        }
        retailShop {
          name
          id
        }
        username
        warehouse {
          name
          id
        }
      }
      meta {
        limit
        count
        page
      }
    }
  }
`;

export interface UserData {
  user: User;
}
export interface UserVars {
  userId: string;
}

export const USER = gql`
  query Query($userId: String!) {
    user(id: $userId) {
      id
      firstName
      amharicFirstName
      lastName
      amharicLastName
      createdAt
      phone
      role
      username
      isActive
      gender
      userProfile {
        address {
          city
          formattedAddress
          amharicFormattedAddress
          lat
          lng
          street
        }
        photoUrl
        idUrl
      }
      retailShop {
        id
        name
      }
      warehouse {
        id
        name
      }
    }
  }
`;

export interface WarehouseManagersData {
  warehouseManagers: User[];
}

export const WAREHOUSE_MANAGERS = gql`
  query WarehouseManagers {
    warehouseManagers {
      id
      firstName
      lastName
    }
  }
`;
