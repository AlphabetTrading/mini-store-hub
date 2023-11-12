import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get_it/get_it.dart';
import 'package:retailer_mobile/blocs/auth/auth_bloc.dart';
import 'package:retailer_mobile/blocs/auth/login/login.dart';
import 'package:retailer_mobile/blocs/profile/profile_cubit.dart';
import 'package:retailer_mobile/config/gql_client.dart';
import 'package:retailer_mobile/data_providers/auth_datasource.dart';
import 'package:retailer_mobile/data_providers/repositories/auth_repository.dart';
import 'package:retailer_mobile/data_providers/repositories/user_repository.dart';
import 'package:retailer_mobile/repositories/auth/auth.repository.dart';
import 'package:retailer_mobile/repositories/users/users.repository.dart';

final GetIt sl = GetIt.instance;

Future<void> init() async {
  sl.registerLazySingleton<AuthDataSource>(
    () => AuthDataSource(
      client: GQLClient.client.value,
    ),
  );

  sl.registerLazySingleton<FlutterSecureStorage>(
    () => const FlutterSecureStorage(),
  );

  sl.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      sl(),
      sl(),
    ),
  );

  sl.registerLazySingleton<AuthenticationRepository>(
    () => AuthenticationRepositoryImpl(sl(), sl()),
  );

  sl.registerLazySingleton<LoginBloc>(
    () => LoginBloc(
      authenticationRepository: sl(),
    ),
  );

  sl.registerLazySingleton<AuthenticationBloc>(
    () => AuthenticationBloc(
      authenticationRepository: sl(),
    ),
  );

 
}
