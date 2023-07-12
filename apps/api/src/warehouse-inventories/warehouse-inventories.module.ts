import { Module } from '@nestjs/common';
import { WarehouseStockResolver } from './warehouse-inventories.resolver';
import { WarehouseStockService } from './warehouse-inventories.service';

@Module({
  providers: [WarehouseStockResolver, WarehouseStockService],
})
export class WarehouseStockModule {}
