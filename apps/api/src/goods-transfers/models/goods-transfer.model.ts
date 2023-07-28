import {
  ObjectType,
  Field,
  registerEnumType,
  HideField,
} from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { StockItem } from './stock-item.model';
import { TransferType } from '@prisma/client';
import { Warehouse } from 'src/warehouses/models/warehouse.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

registerEnumType(TransferType, {
  name: 'TransferType',
  description: 'TransferType',
});

@ObjectType()
export class GoodsTransfer extends BaseModel {
  @Field(() => String, { nullable: true })
  retailShopId?: string;

  @Field(() => String, { nullable: true })
  sourceWarehouseId: string;

  @Field(() => String, { nullable: true })
  destinationWarehouseId?: string;

  @Field(() => [StockItem], { nullable: true })
  goodsTransfersAsDestination?: [StockItem];

  @Field(() => Warehouse, { nullable: true })
  sourceWarehouse?: Warehouse;

  @Field(() => Warehouse, { nullable: true })
  destinationWarehouse?: Warehouse;

  @Field(() => RetailShop, { nullable: true })
  retailShop?: RetailShop;

  @Field(() => TransferType)
  transferType?: TransferType;
}
