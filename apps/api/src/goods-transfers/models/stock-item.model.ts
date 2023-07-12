import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from './goods-transfer.model';
import { Product } from 'src/products/models/product.model';

@ObjectType()
export class StockItem extends BaseModel {
  @Field(() => String)
  goodsTransferId?: string;

  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => GoodsTransfer)
  goodsTransfer?: GoodsTransfer;

  @Field(() => Product)
  product?: Product;
}
