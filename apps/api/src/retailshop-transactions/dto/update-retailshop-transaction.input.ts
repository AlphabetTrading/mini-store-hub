import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateRetailShopTransactionInput } from './create-retailshop-transaction.input';
import { CreateStockItemInput } from 'src/goods-transfers/dto/create-stock-item.input';

@InputType()
export class UpdateRetailShopTransactionInput extends PartialType(
  CreateRetailShopTransactionInput,
) {
  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: CreateStockItemInput[];

  @Field(() => String, { nullable: true })
  retailShopId: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;
}
