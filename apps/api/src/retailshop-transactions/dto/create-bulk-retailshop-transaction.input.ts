import { InputType, Field } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { CreateStockItemInput } from 'src/goods-transfers/dto/create-stock-item.input';

@InputType()
export class CreateBulkRetailShopTransactionInput {
  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: CreateStockItemInput[];

  @Field(() => String)
  retailShopId: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;
}
