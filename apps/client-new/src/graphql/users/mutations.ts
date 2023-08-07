import { gql } from "@apollo/client";
export interface UpdateUserVars {
  updateUserbyIdId: string;
  data: {
    firstName?: string;
    lastName?: string;
    role: string;
    phone?: string;
    username?: string;
    userProfile?: {
      idUrl?: string;
      photoUrl?: string;
      address?: {
        city?: string;
        lat?: number;
        lng?: number;
        street?: string;
        formattedAddress?: string;
      };
    };
  };
}
export interface UpdateUserData {
  updateUserbyId: {
    id: string;
  };
}
export const UPDATE_USER = gql`
  mutation Mutation($updateUserbyIdId: String!, $data: UpdateUserInput!) {
    updateUserbyId(id: $updateUserbyIdId, data: $data) {
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
