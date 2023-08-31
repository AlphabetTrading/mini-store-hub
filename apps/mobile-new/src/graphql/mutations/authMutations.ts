import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
      user {
        id
        amharicFirstName
        amharicLastName
        firstName
        lastName
        gender
        isActive
        phone
        username
        userProfile {
          photoUrl
          idUrl
          address {
            street
          }
        }
        retailShop {
          id
        }
        warehouse {
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

export const GET_ME_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
      amharicFirstName
      amharicFirstName
      phone
      username
      retailShop {
        id
      }
      notificationTokens {
        id
        token
      }
      userProfile {
        address {
          street
        }
        idUrl
        photoUrl
      }
    }
  }
`;
