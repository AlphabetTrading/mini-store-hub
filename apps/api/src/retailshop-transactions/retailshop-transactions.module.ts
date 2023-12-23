import { Module } from '@nestjs/common';
import { RetailShopTransactionsResolver } from './retailshop-transactions.resolver';
import { RetailShopTransactionsService } from './retailshop-transactions.service';
import { RetailShopsService } from 'src/retail-shops/retail-shops.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [],
  providers: [
    RetailShopTransactionsResolver,
    RetailShopTransactionsService,
    RetailShopsService,
    NotificationService,
  ],
})
export class RetailShopTransactionsModule {}
