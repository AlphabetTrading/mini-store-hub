import { InputType, Field } from '@nestjs/graphql';
import { TransferType } from '@prisma/client';
import { CreateStockItemInput } from './create-stock-item.input';

@InputType()
export class CreateGoodsTransferFromMainWarehouseInput {
  @Field(() => String, { nullable: true })
  destinationWarehouseId: string;

  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: [CreateStockItemInput];
}
