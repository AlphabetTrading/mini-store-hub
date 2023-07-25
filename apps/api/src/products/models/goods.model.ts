import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Product } from './product.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';

@ObjectType()
export class Goods extends BaseModel {
  @Field()
  productId: string;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field()
  quantity: number;

  @Field(() => GoodsTransfer)
  goodsTransferId?: string;
}
