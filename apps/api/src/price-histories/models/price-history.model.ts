import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
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

  @Field(() => Product, { nullable: true })
  product?: Product;
}
