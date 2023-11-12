import 'dart:convert';

import 'package:retailer_mobile/models/product.entity.dart';

class RetailShopStock {
  final String? id;
  final DateTime? createdAt;
  final int? maxQuantity;
  final Product? product;
  final String? productId;
  final int? quantity;
  final String? retailShopId;
  final DateTime? updatedAt;

  const RetailShopStock({
    this.id,
    this.createdAt,
    this.maxQuantity,
    this.product,
    this.productId,
    this.quantity,
    this.retailShopId,
    this.updatedAt,
  });

  static const empty = RetailShopStock();

  RetailShopStock copyWith({
    String? id,
    DateTime? createdAt,
    int? maxQuantity,
    Product? product,
    String? productId,
    int? quantity,
    String? retailShopId,
    DateTime? updatedAt,
  }) {
    return RetailShopStock(
      id: id ?? this.id,
      createdAt: createdAt ?? this.createdAt,
      maxQuantity: maxQuantity ?? this.maxQuantity,
      product: product ?? this.product,
      productId: productId ?? this.productId,
      quantity: quantity ?? this.quantity,
      retailShopId: retailShopId ?? this.retailShopId,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'createdAt': createdAt?.toString(),
      'maxQuantity': maxQuantity,
      'product': product?.toMap(),
      'productId': productId,
      'quantity': quantity,
      'retailShopId': retailShopId,
      'updatedAt': updatedAt?.toString(),
    };
  }

  factory RetailShopStock.fromMap(Map<String, dynamic> map) {
    return RetailShopStock(
      id: map['id'],
      createdAt: DateTime.tryParse(map['createdAt']),
      maxQuantity: map['maxQuantity'],
      product: Product.fromMap(map['product']),
      productId: map['productId'],
      quantity: map['quantity'],
      retailShopId: map['retailShopId'],
      updatedAt: DateTime.tryParse(map['updatedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory RetailShopStock.fromJson(String source) =>
      RetailShopStock.fromMap(json.decode(source));

  @override
  String toString() {
    return 'RetailShopStock(id: $id, createdAt: $createdAt, maxQuantity: $maxQuantity, product: $product, productId: $productId, quantity: $quantity, retailShopId: $retailShopId, updatedAt: $updatedAt)';
  }
}