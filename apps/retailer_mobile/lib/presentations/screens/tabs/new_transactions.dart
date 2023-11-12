import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/presentations/screens/home.dart';
import 'package:retailer_mobile/presentations/screens/new_transactions/add_transactions.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';
import 'package:retailer_mobile/utils/urls.dart';

class NewTransactionTabScreen extends StatefulWidget {
  const NewTransactionTabScreen({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(
        builder: (_) => const NewTransactionTabScreen());
  }

  @override
  State<NewTransactionTabScreen> createState() =>
      _NewTransactionTabScreenState();
}

class _NewTransactionTabScreenState extends State<NewTransactionTabScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'New Transaction',
        showBackButton: true,
        onBackButtonPressed: () => context.pop(),
      ),
      body: const Column(
        children: [],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          //  Navigator.of(context).push(
          //   AddNewTransactionScreen.route(),
          // )
          context.go(AppRoutes.selectProductsRoute);
        },
        backgroundColor: AppColors.primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
