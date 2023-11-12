import 'dart:async';
import 'package:retailer_mobile/models/user.entity.dart';

enum AuthenticationStatus {
  unknown,
  authenticated,
  unauthenticated,
}

abstract class AuthenticationRepository {
  Future<void> logIn({
    required String phone,
    required String password,
  });

  Future<User?> getUser();

  Stream<AuthenticationStatus> get status;

  void dispose();

  void logOut();
}
