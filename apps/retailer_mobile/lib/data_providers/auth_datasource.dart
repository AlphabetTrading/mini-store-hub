import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:retailer_mobile/dtos/auth/auth_response.dart';
import 'package:retailer_mobile/graphql/auth/login.dart';
import 'package:retailer_mobile/graphql/users/get_users.dart';
import 'package:retailer_mobile/models/user.entity.dart';

class AuthDataSource {
  late final GraphQLClient _client;

  AuthDataSource({required GraphQLClient client}) {
    _client = client;
  }

  Future<User> getMe() async {
    final response = await _client.query(QueryOptions(
      document: gql(GET_USER),
      fetchPolicy: FetchPolicy.noCache,
    ));
    if (response.hasException) {
      throw Exception(response.exception);
    }
    final userJson = response.data?['me'];
    final user = User.fromMap(userJson);
    return user;
  }

  Future<AuthResponse?> login({
    required String phone,
    required String password,
  }) async {
    final response = await _client.query(QueryOptions(
      document: gql(LOGIN),
      variables: <String, dynamic>{
        "data": {
          'phone': phone,
          'password': password,
        }
      },
    ));
    if (response.hasException) {
      throw Exception(response.exception);
    }
    final data = response.data?['login'];
    if (data == null) {
      return null;
    }
    final result = AuthResponse.fromMap(data);
    debugPrint("natiiiiiii - ${result.toString()}");

    return result;
  }
}
