import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:retailer_mobile/models/retailshop_stock.dart';
import 'package:retailer_mobile/repositories/retailshop/retailshop.repository.dart';

part 'retailshop_stocks_state.dart';

class RetailshopStocksCubit extends Cubit<RetailShopStockState> {
  final RetailShopStockRepository retailshopStocksRepository;
  RetailshopStocksCubit(this.retailshopStocksRepository)
      : super(RetailShopStockInitial());

  Future<List<Category>?> getCategories(String retailShopId) async {
    try {
      emit(RetailShopStockLoading());

      final List<RetailShopStock> retailshopStocks =
          await retailshopStocksRepository.fetchRetailShopStocks(
              retailShopId: retailShopId);
      emit(RetailShopStockLoaded(retailshopStocks: retailshopStocks));
    } catch (e) {
      emit(RetailShopStockError(errorMessage: e.toString()));
    }
    return null;
  }
}
