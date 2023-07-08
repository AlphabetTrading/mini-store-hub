import { Module } from '@nestjs/common';
import { ProductInventoriesService } from './product-inventories.service';
import { ProductInventoriesResolver } from './product-inventories.resolver';

@Module({
  providers: [ProductInventoriesResolver, ProductInventoriesService]
})
export class ProductInventoriesModule {}
