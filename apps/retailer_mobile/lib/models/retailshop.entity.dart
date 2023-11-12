import 'dart:convert';

import 'package:retailer_mobile/models/address.entity.dart';

class RetailShop {
  final String? id;
  final String? name;
  final String? amharicName;
  final bool? status;
  final Address? address;
  final DateTime? updatedAt;
  final DateTime? createdAt;

  const RetailShop({
    this.id,
    this.name,
    this.amharicName,
    this.status,
    this.address,
    this.updatedAt,
    this.createdAt,
  });

  static const empty = RetailShop();

  RetailShop copyWith({
    String? id,
    String? name,
    String? amharicName,
    bool? status,
    Address? address,
    DateTime? updatedAt,
    DateTime? createdAt,
  }) {
    return RetailShop(
      id: id ?? this.id,
      name: name ?? this.name,
      amharicName: amharicName ?? this.amharicName,
      status: status ?? this.status,
      address: address ?? this.address,
      updatedAt: updatedAt ?? this.updatedAt,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'amharicName': amharicName,
      'status': status,
      'address': address?.toMap(),
      'updatedAt': updatedAt.toString(),
      'createdAt': createdAt.toString(),
    };
  }

  factory RetailShop.fromMap(Map<String, dynamic> map) {
    return RetailShop(
      id: map['id'],
      name: map['name'],
      amharicName: map['amharicName'],
      status: map['status'],
      // address: Address.fromMap(map['address']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
      createdAt: DateTime.tryParse(map['createdAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory RetailShop.fromJson(String source) =>
      RetailShop.fromMap(json.decode(source));

  @override
  String toString() {
    return 'RetailShop(id: $id, name: $name, amharicName: $amharicName, status: $status, updatedAt: $updatedAt, createdAt: $createdAt)';
  }
}
