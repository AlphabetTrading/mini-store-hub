import { InputType, Field } from '@nestjs/graphql';
import { TransferType } from '@prisma/client';
import { CreateStockItemInput } from './create-stock-item.input';

@InputType()
export class CreateGoodsTransferInput {
  @Field(() => String, { nullable: true })
  retailShopId?: string;

  @Field(() => String, { nullable: true })
  sourceWarehouseId: string;

  @Field(() => String, { nullable: true })
  destinationWarehouseId?: string;

  @Field(() => [CreateStockItemInput], { nullable: true })
  goods: [CreateStockItemInput];

  @Field(() => TransferType)
  transferType: TransferType;
}
