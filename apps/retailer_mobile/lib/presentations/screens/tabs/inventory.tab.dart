// create an inventory screen with a list of product categories, with a circular avatar for each category, and a list of products for each category, and above all search field

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/presentations/screens/inventory/product_list.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';
import 'package:retailer_mobile/presentations/widgets/new_transactions/category_filter.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';
import 'package:retailer_mobile/utils/urls.dart';

class InventoryTabScreen extends StatefulWidget {
  const InventoryTabScreen({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const InventoryTabScreen());
  }

  @override
  _InventoryTabScreenState createState() => _InventoryTabScreenState();
}

class _InventoryTabScreenState extends State<InventoryTabScreen> {
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
        appBar: const CustomAppBar(
          title: 'Inventory',
          showBackButton: false,
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
              Expanded(
                child: ListView.builder(
                  itemCount: categories.length,
                  itemBuilder: (context, index) {
                    return Column(
                      children: [
                        ListTile(
                            leading: CircleAvatar(
                              backgroundColor: AppColors.amber,
                              child: Text(
                                categories[index].name[0],
                                style: const TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            title: Text(categories[index].name),
                            trailing: const Icon(Icons.arrow_forward_ios),
                            onTap: () {
                              //   Navigator.of(context, rootNavigator: true)
                              //       .pushNamed(
                              // AppRoutes.categoryDetailRoute,
                              // ),
                              context.go(
                                Uri(
                                  path: AppRoutes.categoryDetailRoute,
                                  queryParameters: {
                                    "category": categories[index].name
                                  },
                                ).toString(),
                              );
                            }),
                        const Divider(),
                      ],
                    );
                  },
                ),
              ),
            ],
          ),
        ));
  }
}
