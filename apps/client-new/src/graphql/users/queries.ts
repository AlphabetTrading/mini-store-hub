import { gql } from "@apollo/client";

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
        id
      }
    }
  }
`;
