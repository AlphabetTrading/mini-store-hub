import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
      user {
        id
        firstName
        lastName
        username
        phone
        role
        retailShop {
          id
        }
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($phone: String!) {
    forgotPassword(phone: $phone) {
      accessToken
      message
      success
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $accessToken: String!
    $password: String!
    $phone: String!
  ) {
    resetPassword(
      accessToken: $accessToken
      password: $password
      phone: $phone
    ) {
      accessToken
      message
      success
    }
  }
`;
