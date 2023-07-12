import { InputType, Field, Float } from '@nestjs/graphql';
import { DateTime } from 'graphql-scalars/typings/mocks';

@InputType()
export class CreatePriceHistoryInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;

  @Field({ name: 'product_created_at' })
  productCreatedAt: Date;
}
