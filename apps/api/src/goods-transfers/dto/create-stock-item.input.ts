import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateStockItemInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;
}
