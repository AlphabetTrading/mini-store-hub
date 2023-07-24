import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum NotificationOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(NotificationOrderField, {
  name: 'NotificationOrderField',
  description: 'Properties by which notification connections can be ordered.',
});

@InputType()
export class NotificationOrder extends Order {
  @Field(() => NotificationOrderField)
  field: NotificationOrderField;
}
