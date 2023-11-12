import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:retailer_mobile/graphql/category/categories.dart';
import 'package:retailer_mobile/models/category.entity.dart';

class CategoriesDataSource {
  late final GraphQLClient _client;
  
  CategoriesDataSource(this._client);

  Future<List<Category>?> fetchCategories() async {
    final response = await _client.query(QueryOptions(
      document: gql(GET_CATEGORIES),
    ));
    if (response.hasException) {
      throw Exception(response.exception);
    }
    final data = response.data?['retailShopStocks'];
    if (data == null) {
      return null;
    }
    final result = List<Category>.from(data?.map((x) => x.fromMap(data)));
    return result;
  }

  Future<Category?> fetchCategoryById({required String id}) async {
    final response = await _client.query(QueryOptions(
      document: gql(GET_SINGLE_CATEGORY),
      variables: <String, dynamic>{
        "id": id,
      },
    ));
    if (response.hasException) {
      throw Exception(response.exception);
    }
    final data = response.data?['retailShopStocks'];
    if (data == null) {
      throw Exception("Category not found");
    }
    final result = Category.fromMap(data);
    return result;
  }
}
