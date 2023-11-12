import 'dart:async';

import 'package:flutter/src/foundation/annotations.dart';
import 'package:retailer_mobile/data_providers/categories_datasource.dart';
import 'package:retailer_mobile/repositories/categories/category.repository.dart';

class CategoriesRepositoryImpl implements CategoriesRepository {
  final CategoriesDataSource _categoriesDataSource;

  CategoriesRepositoryImpl(this._categoriesDataSource);

  @override
  Future<List<Category>> fetchCategories() async {
    List<Category>? categories =
        (await _categoriesDataSource.fetchCategories()) as List<Category>?;

    if (categories == null) {
      throw Exception("Categories not found");
    }

    return categories;
  }

  @override
  Future<Category> fetchCategoryById(String id) async {
    Category? category =
        (await _categoriesDataSource.fetchCategoryById(id: id)) as Category?;

    if (category == null) {
      throw Exception("Category not found");
    }

    return category;
  }
}
