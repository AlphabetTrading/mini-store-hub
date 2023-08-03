import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSaleTransactionItemInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => String)
  soldPriceHistoryId: string;

  @Field(() => Float)
  purchasedPrice: number;
}
