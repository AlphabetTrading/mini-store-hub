import 'package:retailer_mobile/models/product.entity.dart';

class Category {
  final String? id;
  final String? name;
  final String? amharicName;
  final String? description;
  final String? amharicDescription;
  final String? parentId;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final String? image;
  final List<Product>? products;
  final List<String>? subcategories;

  const Category({
    this.id,
    this.name,
    this.amharicName,
    this.description,
    this.amharicDescription,
    this.parentId,
    this.createdAt,
    this.updatedAt,
    this.image,
    this.products,
    this.subcategories,
  });

  static const empty = Category();

  Category copyWith({
    String? id,
    String? name,
    String? amharicName,
    String? description,
    String? amharicDescription,
    String? parentId,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? image,
    List<Product>? products,
    List<String>? subcategories,
  }) {
    return Category(
      id: id ?? this.id,
      name: name ?? this.name,
      amharicName: amharicName ?? this.amharicName,
      description: description ?? this.description,
      amharicDescription: amharicDescription ?? this.amharicDescription,
      parentId: parentId ?? this.parentId,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      image: image ?? this.image,
      products: products ?? this.products,
      subcategories: subcategories ?? this.subcategories,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'amharicName': amharicName,
      'description': description,
      'amharicDescription': amharicDescription,
      'parentId': parentId,
      'createdAt': createdAt?.toString(),
      'updatedAt': updatedAt?.toString(),
      'image': image,
      'products': products?.map((x) => x.toMap()).toList(),
      'subcategories': subcategories,
    };
  }

  factory Category.fromMap(Map<String, dynamic> map) {
    return Category(
      id: map['id'],
      name: map['name'],
      amharicName: map['amharicName'],
      description: map['description'],
      amharicDescription: map['amharicDescription'],
      parentId: map['parentId'],
      createdAt: DateTime.tryParse(map['createdAt']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
      image: map['image'],
      products: List<Product>.from(
          map['products']?.map((x) => Product.fromMap(x))),
      subcategories: List<String>.from(map['subcategories']),
    );
  }
}
