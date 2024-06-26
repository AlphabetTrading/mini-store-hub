import { InputType, Field } from '@nestjs/graphql';
import { CreateStockItemInput } from 'src/goods-transfers/dto/create-stock-item.input';

@InputType()
export class CreateSaleTransactionInput {
  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: CreateStockItemInput[];

  @Field(() => String)
  retailShopId: string;
}
