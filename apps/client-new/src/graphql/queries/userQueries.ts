import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      id
      lastName
      phone
      role
      updatedAt
      username
      firstName
    }
  }
`;
