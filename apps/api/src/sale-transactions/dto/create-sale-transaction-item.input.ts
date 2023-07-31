import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSaleTransactionItemInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;
}
