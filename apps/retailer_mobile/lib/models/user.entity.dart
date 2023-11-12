import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:retailer_mobile/models/notification_token.entity.dart';
import 'package:retailer_mobile/models/retailshop.entity.dart';
import 'package:retailer_mobile/models/user_profile.entity.dart';

class User {
  final String? id;
  final String? firstName;
  final String? amharicFirstName;
  final String? lastName;
  final String? amharicLastName;
  final String? gender;
  final String? phone;
  final bool? isActive;
  final String? role;
  final UserProfile? userProfile;
  final List<NotificationToken>? notificationTokens;
  final List<RetailShop>? retailShop;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const User({
    this.id,
    this.firstName,
    this.amharicFirstName,
    this.lastName,
    this.amharicLastName,
    this.gender,
    this.phone,
    this.isActive,
    this.role,
    this.userProfile,
    this.notificationTokens,
    this.retailShop,
    this.createdAt,
    this.updatedAt,
  });

  static const empty = User();

  User copyWith({
    String? id,
    String? firstName,
    String? amharicFirstName,
    String? lastName,
    String? amharicLastName,
    String? gender,
    String? phone,
    bool? isActive,
    String? role,
    UserProfile? userProfile,
    List<NotificationToken>? notificationTokens,
    List<RetailShop>? retailShops,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return User(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      amharicFirstName: amharicFirstName ?? this.amharicFirstName,
      lastName: lastName ?? this.lastName,
      amharicLastName: amharicLastName ?? this.amharicLastName,
      gender: gender ?? this.gender,
      phone: phone ?? this.phone,
      isActive: isActive ?? this.isActive,
      role: role ?? this.role,
      userProfile: userProfile ?? this.userProfile,
      notificationTokens: notificationTokens ?? this.notificationTokens,
      retailShop: retailShops ?? retailShop,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      "id": id,
      "firstName": firstName,
      "amharicFirstName": amharicFirstName,
      "lastName": lastName,
      "amharicLastName": amharicLastName,
      "gender": gender,
      "phone": phone,
      "isActive": isActive,
      "role": role,
      "userProfile": userProfile?.toMap(),
      "notificationTokens": notificationTokens?.map((e) => e.toMap()).toList(),
      "retailShops": retailShop?.map((e) => e.toMap()).toList(),
      "createdAt": createdAt.toString(),
      "updatedAt": updatedAt.toString(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    debugPrint("user map - $map");
    return User(
      id: map['id'],
      firstName: map['firstName'],
      amharicFirstName: map['amharicFirstName'],
      lastName: map['lastName'],
      amharicLastName: map['amharicLastName'],
      gender: map['gender'],
      phone: map['phone'],
      isActive: map['isActive'],
      role: map['role'],
      userProfile: map['userProfile'] != null
          ? UserProfile.fromMap(map['userProfile'])
          : UserProfile.empty,
      notificationTokens: List<NotificationToken>.from(
          map['notificationTokens']?.map((x) => NotificationToken.fromMap(x))),
      // retailShop: List<RetailShop>.from(
      //     map['retailShop']?.map((x) => RetailShop.fromMap(x))),
      createdAt: DateTime.tryParse(map['createdAt']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
    );
  }

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  String toJson() => json.encode(toMap());

  @override
  String toString() {
    return 'User(id: $id, firstName: $firstName)';
  }
}
