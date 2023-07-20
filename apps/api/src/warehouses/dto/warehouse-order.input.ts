import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum WarehouseOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
}

registerEnumType(WarehouseOrderField, {
  name: 'WarehouseOrderField',
  description: 'Properties by which warehouse connections can be ordered.',
});

@InputType()
export class WarehouseOrder extends Order {
  @Field(() => WarehouseOrderField)
  field: WarehouseOrderField;
}
