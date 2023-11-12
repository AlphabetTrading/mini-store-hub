import 'dart:convert';

import 'package:retailer_mobile/models/address.entity.dart';

class UserProfile {
  final String? id;
  final String? idUrl;
  final String? photoUrl;
  final Address? address;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const UserProfile({
    this.id,
    this.idUrl,
    this.photoUrl,
    this.address,
    this.createdAt,
    this.updatedAt,
  });

  static const empty = UserProfile();

  UserProfile copyWith({
    String? id,
    String? idUrl,
    String? photoUrl,
    Address? address,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserProfile(
      id: id ?? this.id,
      idUrl: idUrl ?? this.idUrl,
      photoUrl: photoUrl ?? this.photoUrl,
      address: address ?? this.address,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'idUrl': idUrl,
      'photoUrl': photoUrl,
      'address': address?.toMap(),
      'createdAt': createdAt?.toString(),
      'updatedAt': updatedAt?.toString(),
    };
  }

  factory UserProfile.fromMap(Map<String, dynamic> map) {
    return UserProfile(
      id: map['id'],
      idUrl: map['idUrl'],
      photoUrl: map['photoUrl'],
      address: Address.fromMap(map['address']),
      createdAt: DateTime.tryParse(map['createdAt']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory UserProfile.fromJson(String source) =>
      UserProfile.fromMap(json.decode(source));

  @override
  String toString() {
    return 'UserProfile(id: $id, idUrl: $idUrl, photoUrl: $photoUrl, address: $address, createdAt: $createdAt, updatedAt: $updatedAt)';
  }
}
