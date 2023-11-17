import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateSaleTransactionInput } from './create-sale-transaction.input';
import { CreateStockItemInput } from 'src/goods-transfers/dto/create-stock-item.input';

@InputType()
export class UpdateSaleTransactionInput extends PartialType(
  CreateSaleTransactionInput,
) {
  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: CreateStockItemInput[];

  @Field(() => String, { nullable: true })
  retailShopId: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;
}
