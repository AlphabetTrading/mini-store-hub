import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';
import 'package:retailer_mobile/presentations/widgets/new_transactions/category_filter.dart';
import 'package:retailer_mobile/presentations/widgets/new_transactions/products_list.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';

class AddNewTransactionScreen extends StatefulWidget {
  const AddNewTransactionScreen({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(
        builder: (_) => const AddNewTransactionScreen());
  }

  @override
  _AddNewTransactionScreenState createState() =>
      _AddNewTransactionScreenState();
}

class _AddNewTransactionScreenState extends State<AddNewTransactionScreen> {
  final List<CategoryI> categories = [
    CategoryI(id: 1, name: 'CategoryI 1'),
    CategoryI(id: 2, name: 'CategoryI 2'),
    CategoryI(id: 3, name: 'CategoryI 3'),
    CategoryI(id: 4, name: 'CategoryI 4'),
    CategoryI(id: 5, name: 'CategoryI 5'),
    CategoryI(id: 6, name: 'CategoryI 6'),
    CategoryI(id: 7, name: 'CategoryI 7'),
    CategoryI(id: 8, name: 'CategoryI 8'),
    CategoryI(id: 9, name: 'CategoryI 9'),
    CategoryI(id: 10, name: 'Category 10'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Select Products',
        showBackButton: true,
        onBackButtonPressed: () => context.pop(),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 8.0),
              alignment: Alignment.centerLeft,
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
            const CategoryFilter(),
            const SizedBox(height: 10),
            const ProductsList(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Navigator.of(context).pop({
          //   "selectedCategory": [
          //     categories[1],
          //     categories[2],
          //   ]
          // });
          context.pop({
            "selectedCategory": [
              categories[1],
              categories[2],
            ]
          });
        },
        backgroundColor: AppColors.primaryColor,
        child: const Icon(Icons.check),
      ),
    );
  }
}
