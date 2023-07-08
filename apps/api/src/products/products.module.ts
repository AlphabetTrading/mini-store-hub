import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { CategoriesModule } from 'src/categories/categories.module';
import { PriceHistoriesModule } from 'src/price-histories/price-histories.module';

@Module({
  imports: [CategoriesModule, PriceHistoriesModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
