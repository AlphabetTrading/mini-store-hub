import { InputType, Field, Float } from '@nestjs/graphql';
import { CreateStockItemInput } from 'src/goods-transfers/dto/create-stock-item.input';

@InputType()
export class CreateBulkSaleTransactionInput {
  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: CreateStockItemInput[];

  @Field(() => Float)
  totalPrice: number;

  @Field(() => String)
  retailShopId: string;
}
