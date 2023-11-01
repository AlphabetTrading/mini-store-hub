import { gql } from "@apollo/client";
import { User } from "../../../types/user";
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

export interface UsersData {
  users: {
    items: User[];
    meta: Meta;
  };
}

export const USERS = gql`
  query Users($paginationInput: PaginationInput) {
    users(paginationInput: $paginationInput) {
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
