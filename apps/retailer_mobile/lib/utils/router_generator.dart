import 'package:flutter/material.dart';
import 'package:retailer_mobile/presentations/screens/account.dart';
import 'package:retailer_mobile/presentations/screens/auth/login.dart';
import 'package:retailer_mobile/presentations/screens/inventory/product_detail.dart';
import 'package:retailer_mobile/presentations/screens/inventory/product_list.dart';
import 'package:retailer_mobile/presentations/screens/splash_screen.dart';
import 'package:retailer_mobile/utils/urls.dart';

class RouterGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case AppRoutes.splashRoute:
        return PageRouteBuilder(
            pageBuilder: (context, animation1, animation2) =>
                const SplashScreen(),
            transitionDuration: const Duration(seconds: 5));
      case AppRoutes.loginRoute:
        return PageRouteBuilder(
            pageBuilder: (context, animation1, animation2) => const LoginPage(),
            transitionDuration: const Duration(seconds: 0));

      case AppRoutes.accountRoute:
        return PageRouteBuilder(
            pageBuilder: (context, animation1, animation2) =>
                const AccountScreen(),
            transitionDuration: const Duration(seconds: 0));
      // case AppRoutes.categoryDetailRoute:
      //   return PageRouteBuilder(
      //       pageBuilder: (context, animation1, animation2) =>
      //           const ProductsListScreen(
      //             isCategory: true,
      //           ),
      //           ),
      //       transitionDuration: const Duration(seconds: 0));
      // case AppRoutes.productDetailRoute:
      //   return PageRouteBuilder(
      //       pageBuilder: (context, animation1, animation2) =>
      //           const ProductDetailScreen(),
      //       transitionDuration: const Duration(seconds: 0));
      default:
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(
      builder: (_) {
        return const Scaffold(
            body: Center(child: Text("ERROR while navigating")));
      },
    );
  }
}
