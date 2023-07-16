import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateStockItemInput {
  @Field(() => String, { nullable: true })
  goodsTransferId?: string;

  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;
}
