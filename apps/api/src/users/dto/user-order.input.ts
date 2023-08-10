import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';

export enum UserOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  firstName = 'firstName',
  lastName = 'lastName',
  phone = 'phone',
}

registerEnumType(UserOrderField, {
  name: 'UserOrderField',
  description: 'Properties by which user connections can be ordered.',
});

@InputType()
export class UserOrder extends Order {
  field: UserOrderField;
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByUserInput {
  @Field(() => OrderDirection, { nullable: true })
  firstName?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  lastName?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  phone?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;
}
