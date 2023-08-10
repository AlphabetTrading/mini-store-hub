import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderByCategoryInput } from 'src/categories/dto/order-by-category.input';
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

  @Field(() => OrderByCategoryInput, { nullable: true })
  category?: OrderByCategoryInput;

  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  unit?: OrderDirection;
}
