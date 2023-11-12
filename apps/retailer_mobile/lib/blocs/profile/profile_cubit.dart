import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:retailer_mobile/data_providers/repositories/auth_repository.dart';
import 'package:retailer_mobile/models/models.dart';
import 'package:retailer_mobile/repositories/users/users.repository.dart';

part './profile_state.dart';

class ProfileCubit extends Cubit<ProfileState> {
  final AuthenticationRepositoryImpl authenticationRepository;
  final UserRepository userRepository;
  ProfileCubit(this.authenticationRepository, this.userRepository)
      : super(ProfileInitial());

  Future<void> getUserProfile() async {
    try {
      emit(ProfileLoading());
      User? user = await authenticationRepository.getLocalUser();
      final UserProfile userProfile =
          (await userRepository.getUser(user!.id!)).userProfile!;
      emit(ProfileLoaded(userProfile: userProfile));
    } catch (e) {
      emit(ProfileError(errorMessage: e.toString()));
    }
  }
}
