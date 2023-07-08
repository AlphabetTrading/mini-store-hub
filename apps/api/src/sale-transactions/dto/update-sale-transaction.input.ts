import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateSaleTransactionInput } from './create-sale-transaction.input';

@InputType()
export class UpdateSaleTransactionInput extends PartialType(
  CreateSaleTransactionInput,
) {
  @Field(() => String, { nullable: true })
  productId: string;

  @Field(() => Float, { nullable: true })
  quantity: number;

  @Field(() => Float, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  retailShopId: string;
}
