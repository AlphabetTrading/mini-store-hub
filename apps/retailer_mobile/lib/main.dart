import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:retailer_mobile/app.dart';
import 'package:retailer_mobile/blocs/auth/auth_bloc.dart';
import 'package:retailer_mobile/blocs/auth/login/login_bloc.dart';
import 'package:retailer_mobile/injection_container.dart';
import 'package:retailer_mobile/utils/constants/app_colors.dart';
import 'package:sizer/sizer.dart';

late Uint8List splashScreenByteData;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHiveForFlutter();
  await init();

  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: AppColors.primaryColor,
    statusBarBrightness: Brightness.light,
    systemNavigationBarColor: Colors.transparent,
  ));
  loadSplashImage().then((value) => runApp(const MyApp()));
}

Future<void> loadSplashImage() async {
  ByteData byteData = await rootBundle.load("assets/images/adaptive-icon.png");
  splashScreenByteData = byteData.buffer.asUint8List();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Sizer(
      builder: (context, orientation, deviceType) {
        return MultiBlocProvider(
          providers: [
            BlocProvider<AuthenticationBloc>(
              create: (context) => sl<AuthenticationBloc>(),
            ),
            BlocProvider<LoginBloc>(
              create: (context) => sl<LoginBloc>(),
            ),
          ],
          child: const RootApp(),
        );
      },
    );
  }
}
