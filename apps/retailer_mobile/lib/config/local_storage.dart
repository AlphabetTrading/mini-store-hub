import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LocalStorage {
  static final LocalStorage _localStorage = LocalStorage._internal();

  factory LocalStorage() => _localStorage;

  LocalStorage._internal();

  FlutterSecureStorage storage = const FlutterSecureStorage();
}
