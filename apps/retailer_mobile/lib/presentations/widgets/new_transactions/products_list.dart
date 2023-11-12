import 'package:flutter/material.dart';
import 'package:retailer_mobile/presentations/widgets/new_transactions/product_item.dart';

class ProductsList extends StatefulWidget {
  const ProductsList({super.key});

  @override
  State<ProductsList> createState() => _ProductsListState();
}

class _ProductsListState extends State<ProductsList> {
  final List<Product> products = [
    Product(
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        categoryId: 1,
        isSelected: false),
    Product(
        id: 2,
        name: 'Product 2',
        price: 200,
        quantity: 20,
        categoryId: 2,
        isSelected: false),
    Product(
        id: 3,
        name: 'Product 3',
        price: 300,
        quantity: 30,
        categoryId: 3,
        isSelected: false),
    Product(
        id: 4,
        name: 'Product 4',
        price: 400,
        quantity: 40,
        categoryId: 4,
        isSelected: false),
    Product(
        id: 5,
        name: 'Product 5',
        price: 500,
        quantity: 50,
        categoryId: 5,
        isSelected: false),
    Product(
        id: 6,
        name: 'Product 6',
        price: 600,
        quantity: 60,
        categoryId: 3,
        isSelected: false),
    Product(
        id: 7,
        name: 'Product 7',
        price: 700,
        quantity: 70,
        categoryId: 2,
        isSelected: false),
    Product(
        id: 8,
        name: 'Product 8',
        price: 800,
        quantity: 80,
        categoryId: 2,
        isSelected: false),
    Product(
        id: 9,
        name: 'Product 9',
        price: 900,
        quantity: 90,
        categoryId: 9,
        isSelected: false),
    Product(
        id: 10,
        name: 'Product 10',
        price: 1000,
        quantity: 100,
        categoryId: 1,
        isSelected: false),
    Product(
        id: 11,
        name: 'Product 11',
        price: 1100,
        quantity: 110,
        categoryId: 1,
        isSelected: false),
    Product(
        id: 12,
        name: 'Product 12',
        price: 1200,
        quantity: 120,
        categoryId: 1,
        isSelected: false),
  ];

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: SingleChildScrollView(
        child: ListView.builder(
          physics: const NeverScrollableScrollPhysics(),
          shrinkWrap: true,
          itemCount: products.length,
          scrollDirection: Axis.vertical,
          itemBuilder: (BuildContext context, int index) {
            return ProductCard(product: products[index]);
          },
        ),
      ),
    );
  }
}
