import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { DateTime } from 'graphql-scalars/typings/mocks';
import { BaseModel } from 'src/common/models/base.model';
import { Product } from 'src/products/models/product.model';

@ObjectType()
export class PriceHistory extends BaseModel {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;

  // @Field({ name: 'product_created_at' })
  // productCreatedAt: Date;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => Product, { nullable: true })
  activeProduct?: Product;
}
