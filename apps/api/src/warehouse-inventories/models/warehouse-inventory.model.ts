import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { Warehouse } from 'src/warehouses/models/warehouse.model';

@ObjectType()
export class WarehouseStock extends BaseModel {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  warehouseId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Warehouse, { nullable: true })
  warehouse?: Warehouse;

  @Field(() => [GoodsTransfer], { nullable: true })
  goodsTransfers?: GoodsTransfer[];
}
