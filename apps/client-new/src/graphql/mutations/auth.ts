import { gql } from "@apollo/client";

export const LOG_IN = gql(/* GraphQL */ `mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        role
      }
      refreshToken
      accessToken
    }
  }
`);