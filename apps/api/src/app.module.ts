import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import config from 'src/common/configs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { PrismaModule } from 'nestjs-prisma';
import { PriceHistoriesModule } from './price-histories/price-histories.module';
import { SaleTransactionsModule } from './sale-transactions/sale-transactions.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { RetailShopsModule } from './retail-shops/retail-shops.module';
import { GoodsTransfersModule } from './goods-transfers/goods-transfers.module';
import { ProductInventoriesModule } from './product-inventories/product-inventories.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'client', 'dist'),
    }),
    PrismaModule,
    AuthModule,
    CategoriesModule,
    GoodsTransfersModule,
    PriceHistoriesModule,
    ProductInventoriesModule,
    ProductsModule,
    RetailShopsModule,
    SaleTransactionsModule,
    UsersModule,
    WarehousesModule,
    UserProfileModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
