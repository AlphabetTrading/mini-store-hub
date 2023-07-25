import { gql } from "@apollo/client";

export interface CategoryData {
  categories: { items: { id: string; name: string }[] };
}

export const CATEGORIES = gql`
  query Items {
    categories {
      items {
        id
        name
      }
    }
  }
`;
