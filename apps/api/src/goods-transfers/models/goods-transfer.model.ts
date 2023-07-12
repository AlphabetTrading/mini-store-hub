import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { StockItem } from './stock-item.model';
import { TransferType } from '@prisma/client';

registerEnumType(TransferType, {
  name: 'TransferType',
  description: 'TransferType',
});
@ObjectType()
export class GoodsTransfer extends BaseModel {
  @Field(() => String, { nullable: true })
  retailShopId?: string;

  @Field(() => String, { nullable: true })
  sourceWarehouseId: string;

  @Field(() => String, { nullable: true })
  destinationWarehouseId?: string;

  @Field(() => [StockItem], { nullable: true })
  goods?: string;

  @Field(() => TransferType)
  transferType?: TransferType;
}
