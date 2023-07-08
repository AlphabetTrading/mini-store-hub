import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePriceHistoryInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;
}
