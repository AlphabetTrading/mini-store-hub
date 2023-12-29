import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { Category } from 'src/categories/models/category.model';
import { BaseModel } from 'src/common/models/base.model';
import { PriceHistory } from 'src/price-histories/models/price-history.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';
import { WarehouseStock } from 'src/warehouse-inventories/models/warehouse-inventory.model';
import { Goods } from './goods.model';
// import { SaleTransactionItem } from 'src/sale-transactions/models/sale-transaction-item.model';

registerEnumType(UnitType, {
  name: 'UnitType',
  description: 'UnitType role',
});

@ObjectType()
export class Product extends BaseModel {
  @Field()
  serialNumber: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  amharicName?: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  amharicDescription?: string;

  @Field(() => UnitType)
  unit: UnitType;

  @Field()
  categoryId: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  // @Field(() => String, { nullable: true })
  // activePriceId?: string;

  // @Field(() => PriceHistory, { nullable: true })
  // activePrice?: PriceHistory;

  @Field(() => [String], { nullable: true })
  images?: string[];

  // @Field(() => [PriceHistory], { nullable: true })
  // priceHistory?: PriceHistory[];

  // @Field(() => [SaleTransactionItem], { nullable: true })
  // saleTransactionItem?: SaleTransactionItem[];

  @Field(() => [RetailShopStock], { nullable: true })
  retailShopStock?: RetailShopStock[];

  @Field(() => [WarehouseStock], { nullable: true })
  warehouseStock?: WarehouseStock[];

  @Field(() => [Goods], { nullable: true })
  goods?: Goods[];
}
