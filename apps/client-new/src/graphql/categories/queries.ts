import { gql } from "@apollo/client";
import { Meta } from "../../../types/common";
import { Category } from "../../../types/categories";

export interface CategoryVars {
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
export interface CategoryData {
  categories: {
    items: Category[];
    meta: Meta;
  };
}

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
