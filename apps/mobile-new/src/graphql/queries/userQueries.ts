import { gql } from "@apollo/client";

export const GET_ME_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
      username
      amharicFirstName
      amharicLastName
      phone
      retailShop {
        id
      }
      role
      createdAt
      updatedAt
      notificationTokens {
        token
      }
      userProfile {
        photoUrl
        idUrl
        address {
          city
          formattedAddress
          id
          street
          updatedAt
        }
      }
    }
  }
`;
