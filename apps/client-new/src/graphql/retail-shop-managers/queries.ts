import { gql } from "@apollo/client";
import { User } from "../../../types/user";


export interface RetailShopManagersData {
    retailShopManagers: User[];
}
export const RETAIL_SHOP_MANAGERS = gql`
query Query {
  retailShopManagers {
    id
    firstName
    lastName
    phone
    userProfile {
      address {
        city
        street
        lat
        lng
      }
    }
  }
}

`