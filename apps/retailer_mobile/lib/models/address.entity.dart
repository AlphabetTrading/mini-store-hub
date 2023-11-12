import 'dart:convert';


class Address {
  final String? id;
  final String? street;
  final String? city;
  final String? amharicFormattedAddress;
  final String? formattedAddress;
  final num? lat;
  final num? lng;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const Address({
    this.id,
    this.street,
    this.city,
    this.amharicFormattedAddress,
    this.formattedAddress,
    this.lat,
    this.lng,
    this.createdAt,
    this.updatedAt,
  });

  static const empty = Address();

  Address copyWith({
    String? id,
    String? street,
    String? city,
    String? amharicFormattedAddress,
    String? formattedAddress,
    num? lat,
    num? lng,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Address(
      id: id ?? this.id,
      street: street ?? this.street,
      city: city ?? this.city,
      amharicFormattedAddress:
          amharicFormattedAddress ?? this.amharicFormattedAddress,
      formattedAddress: formattedAddress ?? this.formattedAddress,
      lat: lat ?? this.lat,
      lng: lng ?? this.lng,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'street': street,
      'city': city,
      'amharicFormattedAddress': amharicFormattedAddress,
      'formattedAddress': formattedAddress,
      'lat': lat,
      'lng': lng,
      'createdAt': createdAt.toString(),
      'updatedAt': updatedAt.toString(),
    };
  }

  factory Address.fromMap(Map<String, dynamic> map) {
    return Address(
      id: map['id'],
      street: map['street'],
      city: map['city'],
      amharicFormattedAddress: map['amharicFormattedAddress'],
      formattedAddress: map['formattedAddress'],
      // lat: map['lat'] as double?,
      // lng: map['lng'] as double?,
      createdAt: DateTime.tryParse(map['createdAt']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Address.fromJson(String source) =>
      Address.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Address(id: $id, street: $street, city: $city, amharicFormattedAddress: $amharicFormattedAddress, formattedAddress: $formattedAddress, lat: $lat, lng: $lng, createdAt: $createdAt, updatedAt: $updatedAt)';
  }
}
