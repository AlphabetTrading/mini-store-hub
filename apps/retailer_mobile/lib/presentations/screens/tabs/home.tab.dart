import 'package:flutter/material.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';

class HomeTabScreen extends StatefulWidget {
  const HomeTabScreen({super.key});

  @override
  State<HomeTabScreen> createState() => _HomeTabScreenState();
}

class _HomeTabScreenState extends State<HomeTabScreen> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: CustomAppBar(title: 'Home'),
      body: Column(
        children: [
          TabBar(
            labelColor: AppColors.primaryColor,
            labelPadding: EdgeInsets.fromLTRB(0, 15, 0, 0),
            indicatorColor: AppColors.primaryColor,
            dividerColor: AppColors.amber,
            labelStyle: TextStyle(
              color: Color(0xFF5956E9),
              fontSize: 18,
              fontFamily: 'Urbanist',
              fontWeight: FontWeight.w500,
              height: 0,
              letterSpacing: 0.36,
            ),
            unselectedLabelStyle: TextStyle(
              color: Color(0xFF838383),
              fontSize: 18,
              fontFamily: 'Urbanist',
              fontWeight: FontWeight.w500,
              height: 0,
              letterSpacing: 0.36,
            ),
            tabs: [
              Tab(text: 'Inventory', key: Key('inventory_tab')),
              Tab(
                text: 'Activity',
                key: Key('activity_tab'),
              ),
            ],
          ),
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: TabBarView(
                children: [
                  // InventoryTab(),
                  // ActivityTab(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
