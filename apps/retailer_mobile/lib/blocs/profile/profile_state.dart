part of 'profile_cubit.dart';

abstract class ProfileState extends Equatable {
  const ProfileState();

  @override
  List<Object> get props => [];
}

class ProfileInitial extends ProfileState {}

class ProfileLoading extends ProfileState {}

class ProfileLoaded extends ProfileState {
  final UserProfile userProfile;
  const ProfileLoaded({required this.userProfile});
}

class ProfileError extends ProfileState {
  final String? errorMessage;
  const ProfileError({this.errorMessage});
}
