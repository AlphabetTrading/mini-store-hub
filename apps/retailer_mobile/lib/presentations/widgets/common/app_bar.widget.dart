import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/blocs/auth/auth_bloc.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';
import 'package:retailer_mobile/utils/constants/app_images.dart';
import 'package:retailer_mobile/utils/urls.dart';

class CustomAppBar extends PreferredSize {
  final String title;
  final bool showBackButton;
  final VoidCallback? onBackButtonPressed;
  final bool showActionsButton;

  const CustomAppBar({
    super.key,
    required this.title,
    this.onBackButtonPressed,
    this.showBackButton = false,
    this.showActionsButton = true,
  }) : super(
          child: const SizedBox.shrink(),
          preferredSize: const Size(100, 80),
        );

  @override
  Widget build(BuildContext context) {
    return AppBar(
      systemOverlayStyle: const SystemUiOverlayStyle(
        statusBarColor: AppColors.primaryColor,
        statusBarIconBrightness: Brightness.light,
        systemNavigationBarIconBrightness: Brightness.light,
      ),
      automaticallyImplyLeading: showBackButton,
      leading: showBackButton
          ? InkWell(
              onTap: () {
                if (onBackButtonPressed != null) {
                  onBackButtonPressed!();
                } else {
                  context.pop();
                }
              },
              child: Container(
                width: 48,
                height: 48,
                margin: const EdgeInsets.symmetric(vertical: 8),
                padding: const EdgeInsets.all(8),
                alignment: Alignment.center,
                child: SvgPicture.asset(
                  AppImages.backIcon,
                  height: 16,
                  width: 16,
                ),
              ),
            )
          : null,
      title: Text(
        title,
        style: const TextStyle(
          color: Color(0xFF2A3FC7),
          fontSize: 24,
          fontFamily: 'Urbanist',
          fontWeight: FontWeight.w600,
        ),
      ),
      backgroundColor: Colors.white,
      foregroundColor: AppColors.primaryColor,
      elevation: 0,
      actions: showActionsButton
          ? [
              BlocBuilder<AuthenticationBloc, AuthenticationState>(
                builder: (context, state) =>
                    PopupMenuButton(itemBuilder: (context) {
                  return [
                    const PopupMenuItem<int>(
                      value: 0,
                      child: Text("My Account"),
                    ),
                    const PopupMenuItem<int>(
                      value: 1,
                      child: Text("Settings"),
                    ),
                    const PopupMenuItem<int>(
                      value: 2,
                      child: Text("Logout"),
                    ),
                  ];
                }, onSelected: (value) {
                  if (value == 0) {
                    // Navigator.of(context, rootNavigator: true)
                    //     .pushNamed(AppRoutes.accountRoute);
                    context.go(AppRoutes.accountRoute);
                  } else if (value == 1) {
                    print("Settings menu is selected.");
                  } else if (value == 2) {
                    context
                        .read<AuthenticationBloc>()
                        .add(AuthenticationLogoutRequested());
                  }
                }),
              ),
            ]
          : [],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(56);
}
