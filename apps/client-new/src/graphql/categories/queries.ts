import { gql } from "@apollo/client";
import { Meta } from "../../../types/common";
import { Category } from "../../../types/categories";

export interface CategoriesVars {
  filterCategoryInput: {
    description: {
      contains: string;
    };
    name: {
      contains: string;
    };
  };
  orderBy: {
    name: string;
  };
  paginationInput: {
    skip: number;
    take: number;
  };
}
export interface CategoriesData {
  categories: {
    items: Category[];
    meta: Meta;
  };
}

export interface CategoryData {
  category: Category;
}

export interface CategoryVars {
  categoryId: string;
}

export const CATEGORY = gql`
  query Category($categoryId: String!) {
    category(id: $categoryId) {
      amharicDescription
      amharicName
      createdAt
      description
      id
      image
      name
    }
  }
`;

export const CATEGORIES = gql`
  query Categories(
    $filterCategoryInput: FilterCategoryInput
    $paginationInput: PaginationInput
    $orderBy: OrderByCategoryInput
  ) {
    categories(
      filterCategoryInput: $filterCategoryInput
      paginationInput: $paginationInput
      orderBy: $orderBy
    ) {
      items {
        id
        name
        amharicName
        description
        amharicDescription
        parentId
        createdAt
        updatedAt
        image
        products {
          id
          name
          description
          amharicName
          amharicDescription
        }
        subcategories {
          id
          name
          amharicName
          description
          amharicDescription
        }
      }
      meta {
        count
        page
      }
    }
  }
`;
