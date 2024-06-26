import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { Product } from 'src/products/models/product.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

@ObjectType()
export class RetailShopStock extends BaseModel {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  retailShopId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  maxQuantity: number;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => RetailShop, { nullable: true })
  retailShop?: RetailShop;

  @Field(() => [GoodsTransfer], { nullable: true })
  goodsTransfers?: GoodsTransfer[];
}
