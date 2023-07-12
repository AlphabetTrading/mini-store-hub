import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreatePriceHistoryInput } from './create-product.input';
import { DateTime } from 'graphql-scalars/typings/mocks';

@InputType()
export class UpdatePriceHistoryInput extends PartialType(
  CreatePriceHistoryInput,
) {
  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Float, { nullable: true })
  purchasedPrice?: number;

  @Field({ name: 'product_created_at', nullable: true })
  productCreatedAt?: Date;
}
