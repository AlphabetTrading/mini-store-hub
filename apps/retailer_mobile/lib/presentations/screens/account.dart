// create my account screen, and show the user's first name, last name
// phone, address, retailshop

// Path: lib/presentations/screens/account.dart

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:retailer_mobile/blocs/auth/auth_bloc.dart';
import 'package:retailer_mobile/presentations/widgets/common/app_bar.widget.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({Key? key}) : super(key: key);

  static Route route() {
    return MaterialPageRoute<void>(builder: (_) => const AccountScreen());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'My Account',
        showBackButton: true,
        onBackButtonPressed: () => context.pop(),
        showActionsButton: false,
      ),
      body: BlocBuilder<AuthenticationBloc, AuthenticationState>(
          builder: (context, state) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              CircleAvatar(
                  radius: 70,
                  child: ClipOval(
                    child: Image.network(
                      state.user.userProfile?.photoUrl ??
                          'https://picsum.photos/250?image=9',
                      fit: BoxFit.cover,
                      width: 150,
                      height: 150,
                    ),
                  )),
              const SizedBox(height: 20),
              Text(
                "Full Name: ${state.user.firstName} ${state.user.lastName}",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 30),
              Text(
                "Phone: ${state.user.phone}",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                "Address: ${state.user.userProfile?.address?.formattedAddress}",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                "RetailShop Name: ${state.user.retailShop?[0].name}",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                "RetailShop Address: ${state.user.retailShop?[0].address?.formattedAddress}",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () {
                  context
                      .read<AuthenticationBloc>()
                      .add(AuthenticationLogoutRequested());
                },
                child: const Text('Logout'),
              ),
            ],
          ),
        );
      }),
    );
  }
}
