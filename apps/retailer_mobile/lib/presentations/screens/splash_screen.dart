import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'dart:async';

import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/blocs/auth/auth_bloc.dart';
import 'package:retailer_mobile/repositories/auth/auth.repository.dart';
import 'package:retailer_mobile/utils/urls.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Timer(
        const Duration(seconds: 3),
        () => context.replace(
              "/home",
            ));

    return Container(color: Colors.white, child: const LoadingScreen());
  }
}

class LoadingScreen extends StatelessWidget {
  const LoadingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthenticationBloc, AuthenticationState>(
      listener: (context, state) {
        if (state.status == AuthenticationStatus.authenticated) {
          context.pushReplacement(AppRoutes.homeRoute);
        } else if (state.status == AuthenticationStatus.unauthenticated) {
          context.pushReplacement(AppRoutes.loginRoute);
        }
      },
      child: Scaffold(
        body: Center(
          child: Image.asset(
            width: 200,
            height: 200,
            'assets/images/adaptive-icon.png',
          ), // Replace 'loading_image.png' with the path to your image asset
        ),
      ),
    );
  }
}
