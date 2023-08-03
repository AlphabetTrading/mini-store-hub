import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreatePriceHistoryInput } from './create-product-history.input';

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
}
