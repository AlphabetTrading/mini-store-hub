import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateStockItemInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  purchasePrice: number;

  @Field(() => Float)
  sellingPrice: number;
}
