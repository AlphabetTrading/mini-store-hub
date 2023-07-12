import { ObjectType, Field } from '@nestjs/graphql';
import { Address } from 'src/common/models/address.model';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { User } from 'src/users/models/user.model';
import { WarehouseStock } from 'src/warehouse-inventories/models/warehouse-inventory.model';

@ObjectType()
export class Warehouse extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => String, { nullable: true })
  warehouseManagerId?: string;

  @Field(() => User, { nullable: true })
  warehouseManager?: User;

  @Field(() => [WarehouseStock], { nullable: true })
  warehouseStock?: WarehouseStock[];

  @Field(() => [GoodsTransfer], { nullable: true })
  goodsTransfer?: GoodsTransfer[];
}
