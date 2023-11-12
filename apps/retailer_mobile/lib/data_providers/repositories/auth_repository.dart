import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:retailer_mobile/data_providers/auth_datasource.dart';
import 'package:retailer_mobile/dtos/auth/auth_response.dart';
import 'package:retailer_mobile/dtos/auth/login.input.dart';
import 'package:retailer_mobile/models/user.entity.dart';
import 'package:retailer_mobile/repositories/auth/auth.repository.dart';
import 'package:retailer_mobile/repositories/users/users.repository.dart';

class AuthenticationRepositoryImpl implements AuthenticationRepository {
  final _controller = StreamController<AuthenticationStatus>();
  final AuthDataSource _authDataSource;
  final UserRepository _userRepository;
  final FlutterSecureStorage storage = const FlutterSecureStorage();

  AuthenticationRepositoryImpl(this._userRepository, this._authDataSource);

  @override
  Future<void> logIn({
    required String phone,
    required String password,
  }) async {
    LoginInput loginInput = LoginInput(phone: phone, password: password);

    final AuthResponse? result = await _authDataSource.login(
        phone: loginInput.phone, password: loginInput.password);
    if (result == null) {
      throw Exception("Login failed, please try again");
    }
    final accessToken = result.accessToken!;
    final refreshToken = result.refreshToken!;
    await persistToken(accessToken, refreshToken);
    final userData = result.user;
    if (userData!.id == null) {
      throw Exception("Login failed, please try again");
    }
    User user = await _userRepository.getUser(userData.id!);
    await persistUser(user);
    debugPrint("hey");
    _controller.add(AuthenticationStatus.authenticated);
  }

  @override
  Future<User?> getUser() async {
    final user = await getLocalUser();
    return user;
  }

  @override
  void logOut() async {
    _controller.add(AuthenticationStatus.unauthenticated);
    await storage.delete(key: "jwt");
    await storage.delete(key: "user");
  }

  @override
  void dispose() => _controller.close();

  @override
  Stream<AuthenticationStatus> get status async* {
    User? user = await getLocalUser();

    if (user != null) {
      yield AuthenticationStatus.authenticated;
    } else {
      yield AuthenticationStatus.unauthenticated;
    }
    yield* _controller.stream;
  }

  Future<void> persistToken(String accessToken, String refreshToken) async {
    try {
      await storage.write(
        key: "jwt",
        value: json.encode(
          {"accessToken": accessToken, "refreshToken": accessToken},
        ),
      );
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<void> persistUser(User user) async {
    try {
      await storage.write(key: "user", value: user.toJson());
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<User?> getLocalUser() async {
    String? userString = await storage.read(key: "user");
    if (userString != null) {
      return User.fromJson(userString);
    }
    return null;
  }

  dynamic convertJsonToMap(dynamic json) {
    if (json is Map) {
      return json.map(
          (key, value) => MapEntry(key.toString(), convertJsonToMap(value)));
    } else if (json is List) {
      return json.map((value) => convertJsonToMap(value)).toList();
    } else {
      return json;
    }
  }
}
