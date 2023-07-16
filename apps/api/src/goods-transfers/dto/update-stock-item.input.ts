import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateStockItemInput } from './create-stock-item.input';

@InputType()
export class UpdateStockItemInput extends PartialType(CreateStockItemInput) {
  @Field(() => String, { nullable: true })
  goodsTransferId?: string;

  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => Float, { nullable: true })
  quantity?: number;
}
