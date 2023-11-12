import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:retailer_mobile/models/user.entity.dart';

class AuthResponse {
  final String? accessToken;
  final String? refreshToken;
  final User? user;

  const AuthResponse({
    this.accessToken,
    this.refreshToken,
    this.user,
  });

  static const empty = AuthResponse();

  AuthResponse copyWith({
    String? accessToken,
    String? refreshToken,
    User? user,
  }) {
    return AuthResponse(
      accessToken: accessToken ?? this.accessToken,
      refreshToken: refreshToken ?? this.refreshToken,
      user: user ?? this.user,
    );
  }

  factory AuthResponse.fromMap(Map<String, dynamic> map) {
    final user = User.fromMap(map['user']);
    return AuthResponse(
      accessToken: map['accessToken'],
      refreshToken: map['refreshToken'],
      user: user,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'user': user?.toMap(),
    };
  }

  factory AuthResponse.fromJson(String source) =>
      AuthResponse.fromMap(json.decode(source));

  String toJson() => json.encode(toMap());
}
