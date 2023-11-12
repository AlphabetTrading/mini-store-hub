// create a ProductsListScreen widget, and show the list of products for selected category

// Path: lib/presentations/screens/new_transactions/add_transactions.dart

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';
import 'package:retailer_mobile/utils/urls.dart';

class ProductsListScreen extends StatefulWidget {
  // category id
  final String categoryId;
  const ProductsListScreen({Key? key, required this.categoryId})
      : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(
        builder: (_) => const ProductsListScreen(
              categoryId: '1',
            ));
  }

  @override
  _ProductsListScreenState createState() => _ProductsListScreenState();
}

class _ProductsListScreenState extends State<ProductsListScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Products List',
        showBackButton: true,
        onBackButtonPressed: () => context.pop(),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              alignment: Alignment.center,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.black),
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: const TextField(
                decoration: InputDecoration(
                    hintText: 'Search',
                    prefixIcon: Icon(Icons.search),
                    border: InputBorder.none,
                    fillColor: AppColors.amber),
              ),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                shrinkWrap: true,
                itemCount: 10,
                itemBuilder: (context, index) {
                  return Container(
                    margin: const EdgeInsets.symmetric(vertical: 5),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.black),
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: ListTile(
                      title: Text('Product $index'),
                      subtitle: Text('Product $index description'),
                      trailing: const Icon(Icons.add),
                      onTap: () => {
                        context.go(AppRoutes.productDetailRoute),
                        // Navigator.of(context)
                        //     .pushNamed(AppRoutes.productDetailRoute)
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
