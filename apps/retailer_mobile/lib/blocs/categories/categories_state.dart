part of 'categories_cubit.dart';

abstract class CategoryState extends Equatable {
  const CategoryState();
  @override
  List<Object> get props => [];
}

class CategoryInitial extends CategoryState {}

class CategoryLoading extends CategoryState {}

class CategoryLoaded extends CategoryState {
  final List<Category> categories;
  const CategoryLoaded({required this.categories});
}

class CategoryError extends CategoryState {
  final String? errorMessage;
  const CategoryError({this.errorMessage});
}
