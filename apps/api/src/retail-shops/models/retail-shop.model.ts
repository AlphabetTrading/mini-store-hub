import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { Product } from 'src/products/models/product.model';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';

@ObjectType()
export class RetailShop extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  address: string;

  @Field(() => [GoodsTransfer])
  GoodsTransfer?: GoodsTransfer[];

  @Field(() => [SaleTransaction])
  SaleTransaction?: SaleTransaction[];
}
