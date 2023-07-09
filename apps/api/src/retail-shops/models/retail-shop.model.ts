import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class RetailShop extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  address: string;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;

  @Field(() => User, { nullable: true })
  retailShopManager?: User;

  @Field(() => [GoodsTransfer])
  GoodsTransfer?: GoodsTransfer[];

  @Field(() => [SaleTransaction])
  SaleTransaction?: SaleTransaction[];
}
