import { Module } from '@nestjs/common';
import { SaleTransactionsResolver } from './sale-transactions.resolver';
import { SaleTransactionsService } from './sale-transactions.service';

@Module({
  imports: [],
  providers: [SaleTransactionsResolver, SaleTransactionsService],
})
export class SaleTransactionsModule {}
