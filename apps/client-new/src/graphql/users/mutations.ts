import { gql } from "@apollo/client";
export interface UpdateUserVars {
  data: {
    firstName?: string;
    lastName?: string;
    role: string;
    phone?: string;
    username?: string;
    userProfile: {
      userId: string;
      address?: {
        city?: string;
        lat?: string;
        lng?: string;
        street?: string;
        formattedAddress?: string;
      };
    };
  };
}
export interface UpdateUserData {
  id: string;
}
export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
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

export const REGISTER_USER = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      user {
        id
      }
    }
  }
`;
