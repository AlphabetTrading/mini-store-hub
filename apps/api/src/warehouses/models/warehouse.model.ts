import { ObjectType, Field } from '@nestjs/graphql';
import { Address } from 'src/common/models/address.model';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { User } from 'src/users/models/user.model';
import { WarehouseStock } from 'src/warehouse-inventories/models/warehouse-inventory.model';

@ObjectType()
export class Warehouse extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  warehouseManagerId?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => User, { nullable: true })
  warehouseManager?: User;

  @Field(() => [WarehouseStock], { nullable: true })
  warehouseStock?: WarehouseStock[];

  @Field(() => [RetailShopStock], { nullable: true })
  retailShopStock?: RetailShopStock[];

  @Field(() => [GoodsTransfer], { nullable: true })
  goodsTransferAsSource?: GoodsTransfer[];

  @Field(() => [GoodsTransfer], { nullable: true })
  goodsTransferAsDestination?: GoodsTransfer[];
}
