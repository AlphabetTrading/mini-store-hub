import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum GoodsTransferOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(GoodsTransferOrderField, {
  name: 'GoodsTransferOrderField',
  description: 'Properties by which goodsTransfer connections can be ordered.',
});

@InputType()
export class GoodsTransferOrder extends Order {
  @Field(() => GoodsTransferOrderField)
  field: GoodsTransferOrderField;
}
