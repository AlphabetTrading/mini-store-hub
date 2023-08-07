import { gql } from "@apollo/client";
import { User } from "../../../types/user";

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
  };
}

export const USERS = gql`
  query Users {
    users {
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
      lastName
      createdAt
      phone
      role
      username
      userProfile {
        address {
          city
          formattedAddress
          lat
          lng
          street
        }
        # photoUrl
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
