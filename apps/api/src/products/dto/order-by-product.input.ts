import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderDirection } from 'src/common/order/order-direction';

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByProductInput {
  @Field(() => OrderDirection, { nullable: true })
  name?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  serialNumber?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  category?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;
}
