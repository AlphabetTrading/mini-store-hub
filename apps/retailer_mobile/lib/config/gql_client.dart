import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:retailer_mobile/config/local_storage.dart';
import 'package:retailer_mobile/utils/urls.dart';

class GQLClient {
  static final HttpLink httpLink = HttpLink(
    URLs.graphqlEndpoint,
  );

  static final AuthLink authLink = AuthLink(
    getToken: () async {
      final token = await getTokenFromStorage();
      return 'Bearer $token';
    },
  );

  static final Link link = authLink.concat(httpLink);

  static ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      // cache: GraphQLCache(),
      cache: GraphQLCache(store: HiveStore()),
      link: link,
    ),
  );

  static getTokenFromStorage() async {
    FlutterSecureStorage storage = LocalStorage().storage;
    final jwt = await storage.read(key: "jwt");
    if (jwt == null) return '';
    final parsedJwt = jsonDecode(jwt);
    final accessToken = parsedJwt['accessToken'];
    return accessToken;
  }
}
