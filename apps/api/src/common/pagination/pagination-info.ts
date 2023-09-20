import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/models/category.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { StockItem } from 'src/goods-transfers/models/stock-item.model';
import { Notification } from 'src/notification/models/notification.model';
import { PriceHistory } from 'src/price-histories/models/price-history.model';
import { Product } from 'src/products/models/product.model';
import { ProductRankWithExtraInfo } from 'src/products/models/products-with-info.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { RetailShopWithExtraInfo } from 'src/retail-shops/models/retail-shop-with-info.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';
import { SaleTransactionItem } from 'src/sale-transactions/models/sale-transaction-item.model';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';
import { User } from 'src/users/models/user.model';
import { WarehouseStock } from 'src/warehouse-inventories/models/warehouse-inventory.model';
import { Warehouse } from 'src/warehouses/models/warehouse.model';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  count?: number;
}

@ObjectType()
export class PaginationProducts {
  @Field(() => [Product])
  items: Product[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationProductsWithExtraInfo {
  @Field(() => [ProductRankWithExtraInfo])
  items: ProductRankWithExtraInfo[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationWarehouses {
  @Field(() => [Warehouse])
  items: Warehouse[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationWarehouseStocks {
  @Field(() => [WarehouseStock])
  items: WarehouseStock[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationPriceHistories {
  @Field(() => [PriceHistory])
  items: PriceHistory[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationRetailShops {
  @Field(() => [RetailShop])
  items: RetailShop[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationRetailShopsWithExtraInfo {
  @Field(() => [RetailShopWithExtraInfo])
  items: RetailShopWithExtraInfo[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationRetailShopStocks {
  @Field(() => [RetailShopStock])
  items: RetailShopStock[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationUser {
  @Field(() => [User])
  items: User[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationCategories {
  @Field(() => [Category])
  items: Category[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationGoodsTransfer {
  @Field(() => [GoodsTransfer])
  items: GoodsTransfer[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationStockItems {
  @Field(() => [StockItem])
  items: StockItem[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationUsers {
  @Field(() => [User])
  items: User[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationNotifications {
  @Field(() => [Notification])
  items: Notification[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

// @ObjectType()
// export class PaginationSaleTransactions {
//   @Field(() => [any & { _count: { id: number; }; _sum: { price: number; }; }])
//   items: SaleTransaction[];

//   @Field(() => PaginationInfo, { nullable: true })
//   meta?: PaginationInfo;
// }

@ObjectType()
export class CountType {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class SumType {
  @Field(() => Int)
  price: number;
}

@ObjectType()
export class CustomType {
  @Field(() => CountType)
  _count: CountType;

  @Field(() => SumType)
  _sum: SumType;
}

@ObjectType()
export class PaginationSaleTransactionItems {
  @Field(() => [SaleTransactionItem])
  items: SaleTransactionItem[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

// create me object type for sales transaction group by createdAt type
@ObjectType()
export class PaginationSaleTransactions {
  @Field(() => [SaleTransaction])
  items: SaleTransaction[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationSaleItemTransactions {
  @Field(() => [SaleTransactionItem])
  items: SaleTransactionItem[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}
