import { Module } from '@nestjs/common';
import { SaleTransactionsResolver } from './sale-transactions.resolver';
import { SaleTransactionsService } from './sale-transactions.service';
import { RetailShopsService } from 'src/retail-shops/retail-shops.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [],
  providers: [
    SaleTransactionsResolver,
    SaleTransactionsService,
    RetailShopsService,
    NotificationService,
  ],
})
export class SaleTransactionsModule {}
