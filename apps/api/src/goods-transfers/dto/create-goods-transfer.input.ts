import { InputType, Field } from '@nestjs/graphql';
import { StockItem } from '../models/stock-item.model';
import { TransferType } from '@prisma/client';

@InputType()
export class CreateGoodsTransferInput {
  @Field(() => String, { nullable: true })
  retailShopId?: string;

  @Field(() => String, { nullable: true })
  sourceWarehouseId: string;

  @Field(() => String, { nullable: true })
  destinationWarehouseId?: string;

  @Field(() => [StockItem], { nullable: true })
  goods?: string;

  @Field(() => TransferType, { nullable: true })
  transferType?: TransferType;
}
