import 'package:flutter/material.dart';
import 'package:retailer_mobile/presentations/screens/auth/login_form.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const LoginPage());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryColor,
      body: SafeArea(
        child: Stack(
          children: [
            Container(
              color: Colors.white,
              child: const Padding(
                padding: EdgeInsets.all(12),
                child: LoginForm(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
