import 'dart:convert';

class PriceHistory {
  final String? id;
  final String? productId;
  final num? price;
  final num? purchasedPrice;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const PriceHistory({
    this.id,
    this.productId,
    this.price,
    this.purchasedPrice,
    this.createdAt,
    this.updatedAt,
  });

  static const empty = PriceHistory();

  PriceHistory copyWith({
    String? id,
    String? productId,
    num? price,
    num? purchasedPrice,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return PriceHistory(
      id: id ?? this.id,
      productId: productId ?? this.productId,
      price: price ?? this.price,
      purchasedPrice: purchasedPrice ?? this.purchasedPrice,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'productId': productId,
      'price': price,
      'purchasedPrice': purchasedPrice,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }

  factory PriceHistory.fromMap(Map<String, dynamic> map) {
    return PriceHistory(
      id: map['id'],
      productId: map['productId'],
      price: map['price'],
      purchasedPrice: map['purchasedPrice'],
      createdAt: map['createdAt'],
      updatedAt: map['updatedAt'],
    );
  }

  String toJson() => json.encode(toMap());

  factory PriceHistory.fromJson(String source) => PriceHistory.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Price(id: $id, productId: $productId, price: $price, purchasedPrice: $purchasedPrice, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is PriceHistory &&
        other.id == id &&
        other.productId == productId &&
        other.price == price &&
        other.purchasedPrice == purchasedPrice &&
        other.createdAt == createdAt &&
        other.updatedAt == updatedAt;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        productId.hashCode ^
        price.hashCode ^
        purchasedPrice.hashCode ^
        createdAt.hashCode ^
        updatedAt.hashCode;
  }
}
