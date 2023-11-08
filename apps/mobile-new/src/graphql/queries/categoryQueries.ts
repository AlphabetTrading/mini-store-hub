import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
query ExampleQuery($orderBy: OrderByCategoryInput, $filterCategoryInput: FilterCategoryInput) {
  categories(orderBy: $orderBy, filterCategoryInput: $filterCategoryInput) {
      items {
        id
        name
        description
        amharicName
        amharicDescription
        parentId
        createdAt
        updatedAt
        image
      }
    }
  }
`;

export const GET_SINGLE_CATEGORY = gql`
  query Category($categoryId: String!) {
    category(id: $categoryId) {
      id
      name
      description
      amharicName
      amharicDescription
      products {
        name
        id
        description
      }
      subcategories
      updatedAt
      createdAt
    }
  }
`;
