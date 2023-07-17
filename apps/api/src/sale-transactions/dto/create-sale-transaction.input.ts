import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateSaleTransactionInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;

  @Field(() => String)
  retailShopId: string;
}
