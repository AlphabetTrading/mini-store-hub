import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:retailer_mobile/repositories/categories/category.repository.dart';

part 'categories_state.dart';

class CategoriesCubit extends Cubit<CategoryState> {
  final CategoriesRepository categoryRepository;
  CategoriesCubit(this.categoryRepository) : super(CategoryInitial());

  Future<List<Category>?> getCategories() async {
    try {
      emit(CategoryLoading());

      final List<Category> categories =
          await categoryRepository.fetchCategories();
      emit(CategoryLoaded(categories: categories));
    } catch (e) {
      emit(CategoryError(errorMessage: e.toString()));
    }
    return null;
  }
}
