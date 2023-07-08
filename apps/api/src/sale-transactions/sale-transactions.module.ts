import { Module } from '@nestjs/common';
import { SaleTransactionsService } from './sale-transactions.service';
import { SaleTransactionsResolver } from './sale-transactions.resolver';

@Module({
  providers: [SaleTransactionsResolver, SaleTransactionsService]
})
export class SaleTransactionsModule {}
