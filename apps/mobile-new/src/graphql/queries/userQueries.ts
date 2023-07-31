import { gql } from "@apollo/client";

const GET_ME_QUERY = gql`
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
      userProfile {
        photoUrl
        address {
          amharicFormattedAddress
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
