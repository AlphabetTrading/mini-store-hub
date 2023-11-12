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

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      accessToken: json['accessToken'],
      refreshToken: json['refreshToken'],
      user: User.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() => {
        "accessToken": accessToken,
        "refreshToken": refreshToken,
        "user": user?.toJson(),
      };
}
