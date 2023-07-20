import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum PriceHistoryOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
}

registerEnumType(PriceHistoryOrderField, {
  name: 'PriceHistoryOrderField',
  description: 'Properties by which priceHistory connections can be ordered.',
});

@InputType()
export class PriceHistoryOrder extends Order {
  @Field(() => PriceHistoryOrderField)
  field: PriceHistoryOrderField;
}
