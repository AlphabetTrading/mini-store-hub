import 'dart:convert';

import 'package:retailer_mobile/models/category.entity.dart';
import 'package:retailer_mobile/models/price.entity.dart';

class Product {
  final String? id;
  final String? name;
  final String? amharicName;
  final String? description;
  final String? amharicDescription;
  final String? unit;
  final String? serialNumber;
  final List<String>? images;
  final String? categoryId;
  final Category? category;
  final String? activePriceId;
  final PriceHistory? activePrice;
  final List<PriceHistory>? priceHistory;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const Product({
    this.id,
    this.name,
    this.amharicName,
    this.description,
    this.amharicDescription,
    this.unit,
    this.serialNumber,
    this.images,
    this.categoryId,
    this.category,
    this.activePriceId,
    this.activePrice,
    this.priceHistory,
    this.createdAt,
    this.updatedAt,
  });

  static const empty = Product();

  Product copyWith({
    String? id,
    String? name,
    String? amharicName,
    String? description,
    String? amharicDescription,
    String? unit,
    String? serialNumber,
    List<String>? images,
    String? categoryId,
    Category? category,
    String? activePriceId,
    PriceHistory? activePrice,
    List<PriceHistory>? priceHistory,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Product(
      id: id ?? this.id,
      name: name ?? this.name,
      amharicName: amharicName ?? this.amharicName,
      description: description ?? this.description,
      amharicDescription: amharicDescription ?? this.amharicDescription,
      unit: unit ?? this.unit,
      serialNumber: serialNumber ?? this.serialNumber,
      images: images ?? this.images,
      categoryId: categoryId ?? this.categoryId,
      category: category ?? this.category,
      activePriceId: activePriceId ?? this.activePriceId,
      activePrice: activePrice ?? this.activePrice,
      priceHistory: priceHistory ?? this.priceHistory,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'amharicName': amharicName,
      'description': description,
      'amharicDescription': amharicDescription,
      'unit': unit,
      'serialNumber': serialNumber,
      'images': images,
      'categoryId': categoryId,
      'category': category?.toMap(),
      'activePriceId': activePriceId,
      'activePrice': activePrice?.toMap(),
      'priceHistory': priceHistory?.map((x) => x.toMap()).toList(),
      'createdAt': createdAt.toString(),
      'updatedAt': updatedAt.toString(),
    };
  }

  factory Product.fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'],
      name: map['name'],
      amharicName: map['amharicName'],
      description: map['description'],
      amharicDescription: map['amharicDescription'],
      unit: map['unit'],
      serialNumber: map['serialNumber'],
      images: List<String>.from(map['images']),
      categoryId: map['categoryId'],
      category: Category.fromMap(map['category']),
      activePriceId: map['activePriceId'],
      activePrice: PriceHistory.fromMap(map['activePrice']),
      priceHistory: List<PriceHistory>.from(
          map['priceHistory']?.map((x) => PriceHistory.fromMap(x))),
      createdAt: DateTime.tryParse(map['createdAt']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Product.fromJson(String source) =>
      Product.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Product(id: $id, name: $name, amharicName: $amharicName, description: $description, amharicDescription: $amharicDescription, unit: $unit, serialNumber: $serialNumber, images: $images, categoryId: $categoryId, category: $category, activePriceId: $activePriceId, activePrice: $activePrice, priceHistory: $priceHistory, createdAt: $createdAt, updatedAt: $updatedAt)';
  }
}
