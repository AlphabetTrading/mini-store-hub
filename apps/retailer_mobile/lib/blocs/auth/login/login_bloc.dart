import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';
import 'package:retailer_mobile/models/login.dart';
import 'package:retailer_mobile/repositories/auth/auth.repository.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  LoginBloc({
    required AuthenticationRepository authenticationRepository,
  })  : _authenticationRepository = authenticationRepository,
        super(const LoginState()) {
    on<LoginPhoneChanged>(_onPhoneChanged);
    on<LoginPasswordChanged>(_onPasswordChanged);
    on<LoginSubmitted>(_onSubmitted);
  }

  final AuthenticationRepository _authenticationRepository;

  void _onPhoneChanged(
    LoginPhoneChanged event,
    Emitter<LoginState> emit,
  ) {
    final phone = Phone.dirty(event.phone);
    emit(
      state.copyWith(
        phone: phone,
        status: Formz.validate(<FormzInput>[phone, state.password])
            ? FormzSubmissionStatus.success
            : FormzSubmissionStatus.canceled,
      ),
    );
  }

  void _onPasswordChanged(
    LoginPasswordChanged event,
    Emitter<LoginState> emit,
  ) {
    final password = Password.dirty(event.password);
    emit(
      state.copyWith(
        password: password,
        status: Formz.validate(<FormzInput>[state.phone, password])
            ? FormzSubmissionStatus.success
            : FormzSubmissionStatus.canceled,
      ),
    );
  }

  Future<void> _onSubmitted(
    LoginSubmitted event,
    Emitter<LoginState> emit,
  ) async {
    if (Formz.validate(<FormzInput>[state.phone, state.password])) {
      emit(
        state.copyWith(status: FormzSubmissionStatus.inProgress),
      );
      try {
        await _authenticationRepository.logIn(
          // phone: state.phone.value ,
          // password: state.password.value,
          phone: "0905536110",
          password: "tigistu1234",
        );
        debugPrint('Login success');
        emit(state.copyWith(status: FormzSubmissionStatus.success));
      } catch (e) {
        debugPrint('Login error $e');
        emit(state.copyWith(status: FormzSubmissionStatus.failure));
      }
    }
  }
}
