// create abstract class for categories repository

// Path: lib/data_providers/data_sources/categories_data_source.dart

import 'package:flutter/foundation.dart';

abstract class CategoriesRepository {
  Future<List<Category>> fetchCategories();

  Future<Category> fetchCategoryById(String id);
}
