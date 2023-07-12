import { Module } from '@nestjs/common';
import { RetailShopStockService } from './retail-shop-inventories.service';
import { RetailShopStockResolver } from './retail-shop-inventories.resolver';

@Module({
  providers: [RetailShopStockResolver, RetailShopStockService],
  exports: [RetailShopStockService],
})
export class RetailShopStocksModule {}
