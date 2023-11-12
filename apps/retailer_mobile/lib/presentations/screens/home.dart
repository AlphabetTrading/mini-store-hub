import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:retailer_mobile/presentations/screens/tabs/home.tab.dart';
import 'package:retailer_mobile/presentations/screens/tabs/inventory.tab.dart';
import 'package:retailer_mobile/presentations/screens/tabs/new_transactions.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';
import 'package:sizer/sizer.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const HomePage());
  }

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey(); // Create a key
  final PersistentTabController _persistentTabController =
      PersistentTabController(initialIndex: 0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      body: SafeArea(
        child: PersistentTabView(
          context,
          controller: _persistentTabController,
          screens: _buildScreens(),
          items: _navBarsItems(),
          confineInSafeArea: true,
          onItemSelected: (value) {
            if (value == 2) {
              Navigator.push(context, NewTransactionTabScreen.route());
            }
          },

          // hideNavigationBar: _persistentTabController.index == 2
          //     ? true
          //     : false, // Recommended to set 'resizeToAvoidBottomInset' as true while using this argument. Default is true.
          // hideNavigationBar: false,
          // backgroundColor: Colors.transparent, // Default is Colors.white.
          handleAndroidBackButtonPress: true, // Default is true.
          resizeToAvoidBottomInset:
              true, // This needs to be true if you want to move up the screen when keyboard appears. Default is true.
          stateManagement: true, // Default is true.
          hideNavigationBarWhenKeyboardShows:
              true, // Recommended to set 'resizeToAvoidBottomInset' as true while using this argument. Default is true.
          decoration: NavBarDecoration(
            borderRadius: BorderRadius.circular(10.0),
            colorBehindNavBar: Colors.transparent,
          ),
          popAllScreensOnTapOfSelectedTab: true,
          popActionScreens: PopActionScreensType.all,
          itemAnimationProperties: const ItemAnimationProperties(
            // Navigation Bar's items animation properties.
            duration: Duration(milliseconds: 200),
            curve: Curves.ease,
          ),
          screenTransitionAnimation: const ScreenTransitionAnimation(
            // Screen transition animation on change of selected tab.
            animateTabTransition: true,
            curve: Curves.ease,
            duration: Duration(milliseconds: 200),
          ),
          navBarStyle: NavBarStyle
              .style15, // Choose the nav bar style with this property.
          navBarHeight: 8.49.h,

          bottomScreenMargin: 0,
        ),
      ),
    );
  }
}

List<PersistentBottomNavBarItem> _navBarsItems() {
  return [
    PersistentBottomNavBarItem(
      inactiveColorSecondary: AppColors.blueGrey,
      textStyle: const TextStyle(fontSize: 12),
      icon: SvgPicture.asset(
        alignment: Alignment.bottomCenter,
        fit: BoxFit.cover,
        allowDrawingOutsideViewBox: true,
        'assets/images/adaptive-icon.png',
        semanticsLabel: "Home",
      ),
      inactiveIcon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Home",
      ),
      title: "Home",
      activeColorPrimary: AppColors.primaryColor,
      inactiveColorPrimary: AppColors.darkGrey,
    ),
    PersistentBottomNavBarItem(
      textStyle: const TextStyle(fontSize: 12),
      title: "Inventory",
      icon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Phases",
      ),
      inactiveIcon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Phases",
      ),
      activeColorPrimary: AppColors.primaryColor,
      inactiveColorPrimary: AppColors.darkGrey,
    ),
    PersistentBottomNavBarItem(
      textStyle: const TextStyle(fontSize: 12),
      icon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/plus.svg',
        semanticsLabel: "New Transactions",
      ),
      activeColorPrimary: AppColors.primaryColor,
    ),
    PersistentBottomNavBarItem(
      textStyle: const TextStyle(fontSize: 12),
      title: ("Sales"),
      icon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Storage",
      ),
      inactiveIcon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Storage",
      ),
      activeColorPrimary: AppColors.primaryColor,
      inactiveColorPrimary: AppColors.darkGrey,
    ),
    PersistentBottomNavBarItem(
      textStyle: const TextStyle(fontSize: 12),
      title: ("Insights"),
      icon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Budget",
      ),
      inactiveIcon: SvgPicture.asset(
        allowDrawingOutsideViewBox: true,
        'assets/icons/navigations/inactive_home.svg',
        semanticsLabel: "Budget",
      ),
      activeColorPrimary: AppColors.primaryColor,
      inactiveColorPrimary: AppColors.darkGrey,
    ),
  ];
}

List<Widget> _buildScreens() {
  return [
    _buildScreen(selectedIndex: 0),
    _buildScreen(selectedIndex: 1),
    _buildScreen(selectedIndex: 2),
    _buildScreen(selectedIndex: 3),
    _buildScreen(selectedIndex: 4),
  ];
}

Widget _buildScreen({
  required int selectedIndex,
}) {
  switch (selectedIndex) {
    case 0:
      return const HomeTabScreen();
    case 1:
      return const InventoryTabScreen();
    case 2:
      return const NewTransactionTabScreen();
    case 3:
      return const HomeTabScreen();
    case 4:
      return const HomeTabScreen();
    default:
      return const Text("index default");
  }
}
