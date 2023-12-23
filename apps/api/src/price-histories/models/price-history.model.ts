import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql';
import { StockType } from '@prisma/client';
import { BaseModel } from 'src/common/models/base.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { WarehouseStock } from 'src/warehouse-inventories/models/warehouse-inventory.model';

registerEnumType(StockType, {
  name: 'StockType',
  description: 'Stock type',
});

@ObjectType()
export class PriceHistory extends BaseModel {
  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;

  @Field(() => String, { nullable: true })
  retailShopStockId?: string;

  @Field(() => String, { nullable: true })
  warehouseStockId?: string;

  @Field(() => String, { nullable: true })
  activeRetailShopStockId?: string;

  @Field(() => WarehouseStock, { nullable: true })
  warehouseStock?: WarehouseStock;

  @Field(() => RetailShopStock, { nullable: true })
  retailShopStock?: RetailShopStock;

  @Field(() => RetailShopStock, { nullable: true })
  activeRetailShopStock?: RetailShopStock;

  @Field(() => WarehouseStock, { nullable: true })
  activeWarehouseStock?: WarehouseStock;

  @Field(() => StockType, { nullable: true })
  stockType?: StockType;
}
