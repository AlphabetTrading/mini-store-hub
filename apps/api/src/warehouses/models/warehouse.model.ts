import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { ProductInventory } from 'src/product-inventories/models/product-inventory.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Warehouse extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => String, { nullable: true })
  warehouseManagerId?: string;

  @Field(() => User, { nullable: true })
  warehouseManager?: User;

  @Field(() => [ProductInventory], { nullable: true })
  productInventory?: ProductInventory[];

  @Field(() => [GoodsTransfer], { nullable: true })
  goodsTransfer?: GoodsTransfer[];
}
