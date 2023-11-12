String LOGIN = r"""
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
      user {
        id
        firstName
        amharicFirstName
        lastName
        amharicLastName
        phone
        gender
        role
        username
        isActive
        notificationTokens {
          id
          token
          createdAt
          updatedAt
        }
        retailShop {
          id
          name
          amharicName
          status
          updatedAt
          createdAt
          address {
            id
            street
            city
            amharicFormattedAddress
            formattedAddress
            lat
            lng 
            createdAt
            updatedAt
          }
        }
        notifications {
          id
        }
        userProfile{
          id
          idUrl
          photoUrl
          address {
            id
            street
            city
            amharicFormattedAddress
            formattedAddress
            lat
            lng
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
""";
