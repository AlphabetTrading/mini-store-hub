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
        name
        amharicName
        status
        address {
          id
          city
          formattedAddress
          amharicFormattedAddress
          street
          updatedAt
        }
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
          id
          city
          formattedAddress
          amharicFormattedAddress
          street
          updatedAt
        }
      }
    }
  }
`;
