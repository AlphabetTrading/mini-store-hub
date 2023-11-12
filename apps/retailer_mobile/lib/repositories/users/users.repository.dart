import 'package:retailer_mobile/dtos/auth/login.input.dart';
import 'package:retailer_mobile/models/user.entity.dart';

abstract class UserRepository {
  Future<User> getUser(String id);
}
