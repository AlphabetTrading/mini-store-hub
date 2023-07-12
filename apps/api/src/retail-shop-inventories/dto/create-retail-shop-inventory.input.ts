import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateRetailShopStockInput {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  warehouseId: string;

  @Field(() => Float)
  quantity: number;
}
