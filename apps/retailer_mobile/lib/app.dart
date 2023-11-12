import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/blocs/auth/auth_bloc.dart';
import 'package:retailer_mobile/presentations/screens/account.dart';
import 'package:retailer_mobile/presentations/screens/auth/login.dart';
import 'package:retailer_mobile/presentations/screens/home.dart';
import 'package:retailer_mobile/presentations/screens/inventory/product_detail.dart';
import 'package:retailer_mobile/presentations/screens/inventory/product_list.dart';
import 'package:retailer_mobile/presentations/screens/new_transactions/add_transactions.dart';
import 'package:retailer_mobile/presentations/screens/splash_screen.dart';
import 'package:retailer_mobile/presentations/screens/tabs/new_transactions.dart';
import 'package:retailer_mobile/repositories/auth/auth.repository.dart';
import 'package:retailer_mobile/utils/no_scroll_effect.dart';
import 'package:retailer_mobile/utils/urls.dart';

class RootApp extends StatefulWidget {
  const RootApp({super.key});

  @override
  State<RootApp> createState() => _RootAppState();
}

class _RootAppState extends State<RootApp> {
  final _navigatorKey = GlobalKey<NavigatorState>();

  NavigatorState get _navigator => _navigatorKey.currentState!;

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      // navigatorKey: _navigatorKey,
      // theme: AppTheme().getTheme,
      builder: (context, child) {
        return ScrollConfiguration(
          behavior: NoScrollEffect(),
          child: BlocListener<AuthenticationBloc, AuthenticationState>(
            listener: (context, state) {
              switch (state.status) {
                case AuthenticationStatus.authenticated:
                  // _navigator.pushAndRemoveUntil<void>(
                  //   HomePage.route(),
                  //   (route) => false,
                  // );
                  context.pushReplacement(AppRoutes.homeRoute);
                  break;
                case AuthenticationStatus.unauthenticated:
                  // _navigator.pushAndRemoveUntil<void>(
                  //   LoginPage.route(),
                  //   (route) => false,
                  // );
                  context.pushReplacement(AppRoutes.loginRoute);
                  break;
                case AuthenticationStatus.unknown:
                  break;
              }
            },
            child: child,
          ),
        );
      },
      // initialRoute: 'splash',
      // onGenerateRoute: RouterGenerator.generateRoute,
      routerConfig: _router,
    );
  }
}

final GoRouter _router = GoRouter(
  initialLocation: "/",
  navigatorKey: GlobalKey<NavigatorState>(),
  routes: <RouteBase>[
    GoRoute(
      path: "/",
      builder: (BuildContext context, GoRouterState state) {
        return const SplashScreen();
      },
      routes: <RouteBase>[
        GoRoute(
          path: "home",
          builder: (BuildContext context, GoRouterState state) {
            return const HomePage();
          },
        ),
        GoRoute(
            path: "login",
            builder: (BuildContext context, GoRouterState state) =>
                const LoginPage()),
        GoRoute(
            path: "category-detail/:categoryId",
            builder: (context, state) {
              return ProductsListScreen(
                  categoryId: state.pathParameters['categoryId']!);
            }),
        GoRoute(
            path: "product-detail/:productId",
            builder: (context, state) {
              return ProductDetailScreen(
                  productId: state.pathParameters['productId']!);
            }),
        GoRoute(
          path: "new-transactions",
          builder: (BuildContext context, GoRouterState state) {
            return const NewTransactionTabScreen();
          },
        ),
        GoRoute(
          path: "select-products",
          builder: (BuildContext context, GoRouterState state) {
            return const AddNewTransactionScreen();
          },
        ),
        GoRoute(
            path: "account",
            builder: (context, state) {
              return const AccountScreen();
            }),
      ],
    ),
  ],
);
