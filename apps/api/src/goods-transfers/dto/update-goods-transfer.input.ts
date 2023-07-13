import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateGoodsTransferInput } from './create-goods-transfer.input';
import { StockItem } from '../models/stock-item.model';
import { TransferType } from '@prisma/client';

@InputType()
export class UpdateGoodsTransferInput extends PartialType(
  CreateGoodsTransferInput,
) {
  @Field(() => String, { nullable: true })
  retailShopId?: string;

  @Field(() => String, { nullable: true })
  sourceWarehouseId: string;

  @Field(() => String, { nullable: true })
  destinationWarehouseId?: string;

  @Field(() => TransferType, { nullable: true })
  transferType?: TransferType;
}
