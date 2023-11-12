import 'package:flutter/material.dart';
import 'package:retailer_mobile/models/retailshop_stock.dart';

abstract class RetailShopStockRepository{

  Future<List<RetailShopStock>> fetchRetailShopStocks({@required String retailShopId});

  Future<RetailShopStock> fetchRetailShopStockById({@required String id});

  Future<RetailShopStock> updateRetailShopStock({@required RetailShopStock retailShopStock});

}