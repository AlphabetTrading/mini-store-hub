import { GraphQLModule } from '@nestjs/graphql';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import config from 'src/common/configs/config';
import { GqlConfigService } from './gql-config.service';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PriceHistoriesModule } from './price-histories/price-histories.module';
import { SaleTransactionsModule } from './sale-transactions/sale-transactions.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { RetailShopsModule } from './retail-shops/retail-shops.module';
import { GoodsTransfersModule } from './goods-transfers/goods-transfers.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { StorageModule } from './storage/storage.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WarehouseStockModule } from './warehouse-inventories/warehouse-inventories.module';
import { RetailShopStocksModule } from './retail-shop-inventories/retail-shop-inventories.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    PrismaModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    StorageModule,
    UsersModule,
    UserProfileModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    PriceHistoriesModule,
    WarehousesModule,
    RetailShopsModule,
    WarehouseStockModule,
    RetailShopStocksModule,
    GoodsTransfersModule,
    SaleTransactionsModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
