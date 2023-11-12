part of 'retailshop_stocks_cubit.dart';

abstract class RetailShopStockState extends Equatable {
  const RetailShopStockState();
  @override
  List<Object> get props => [];
}

class RetailShopStockInitial extends RetailShopStockState {}

class RetailShopStockLoading extends RetailShopStockState {}

class RetailShopStockLoaded extends RetailShopStockState {
  final List<RetailShopStock> retailshopStocks;
  const RetailShopStockLoaded({required this.retailshopStocks});
}

class RetailShopStockError extends RetailShopStockState {
  final String? errorMessage;
  const RetailShopStockError({this.errorMessage});
}
