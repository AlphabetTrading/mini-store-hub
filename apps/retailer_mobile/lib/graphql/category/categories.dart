String GET_CATEGORIES = r"""
  query CATEGORIES_QUERY($orderBy: OrderByCategoryInput, $filterCategoryInput: FilterCategoryInput) {
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

""";

String GET_SINGLE_CATEGORY = r"""
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
""";
