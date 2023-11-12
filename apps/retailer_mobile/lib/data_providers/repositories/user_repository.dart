import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:retailer_mobile/data_providers/auth_datasource.dart';
import 'package:retailer_mobile/models/user.entity.dart';
import 'package:retailer_mobile/repositories/users/users.repository.dart';

class UserRepositoryImpl implements UserRepository {
  final AuthDataSource _authDataSource;
  final FlutterSecureStorage storage;

  UserRepositoryImpl(this._authDataSource, this.storage);

  @override
  Future<User> getUser(String id) async {
    final user = await _authDataSource.getMe();
    return user;
  }
}
