import { Module } from '@nestjs/common';
import { SaleTransactionsResolver } from './sale-transactions.resolver';
import { SaleTransactionsService } from './sale-transactions.service';
import { RetailShopsService } from 'src/retail-shops/retail-shops.service';

@Module({
  imports: [],
  providers: [
    SaleTransactionsResolver,
    SaleTransactionsService,
    RetailShopsService,
  ],
})
export class SaleTransactionsModule {}
