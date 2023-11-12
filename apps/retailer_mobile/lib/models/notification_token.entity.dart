import 'dart:convert';

class NotificationToken {
  final String? id;
  final String? token;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const NotificationToken({
    this.id,
    this.token,
    this.createdAt,
    this.updatedAt,
  });

  static const empty = NotificationToken();

  NotificationToken copyWith({
    String? id,
    String? token,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return NotificationToken(
      id: id ?? this.id,
      token: token ?? this.token,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'token': token,
      'createdAt': createdAt.toString(),
      'updatedAt': updatedAt.toString(),
    };
  }

  factory NotificationToken.fromMap(Map<String, dynamic> map) {
    return NotificationToken(
      id: map['id'],
      token: map['token'],
      createdAt: DateTime.tryParse(map['createdAt']),
      updatedAt: DateTime.tryParse(map['updatedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory NotificationToken.fromJson(String source) =>
      NotificationToken.fromMap(json.decode(source));

  @override
  String toString() {
    return 'NotificationToken(id: $id, token: $token, createdAt: $createdAt, updatedAt: $updatedAt)';
  }
}
