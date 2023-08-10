import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';

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

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByNotificationInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  isRead?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  recipientType?: OrderDirection;
}
