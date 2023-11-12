// create a product detail screen with a product image, product name, product price, product description, and a button to add the product to the cart

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';

class ProductDetailScreen extends StatefulWidget {
  final String productId;
  const ProductDetailScreen({Key? key, required this.productId})
      : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(
        builder: (_) => const ProductDetailScreen(
              productId: '1',
            ));
  }

  @override
  _ProductDetailScreenState createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomAppBar(
          title: 'Product Detail',
          showBackButton: true,
          onBackButtonPressed: () => context.pop(),
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Image.network(
                  'https://picsum.photos/250?image=9',
                  height: 200,
                  width: MediaQuery.of(context).size.width,
                ),
                const SizedBox(height: 200),
                Text(
                  'Product Name',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 300),
                Text(
                  'Product Price',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 400),
                Text(
                  'Product Description',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: () {},
                  child: const Text('Add to Cart'),
                ),
                const SizedBox(height: 10),
              ],
            ),
          ),
        ));
  }
}
