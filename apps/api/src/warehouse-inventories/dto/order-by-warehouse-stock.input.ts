import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderDirection } from 'src/common/order/order-direction';
import { OrderByProductInput } from 'src/products/dto/order-by-product.input';
import { OrderByWarehouseInput } from 'src/warehouses/dto/warehouse-order.input';

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByWarehouseStockInput {
  @Field(() => OrderByProductInput, { nullable: true })
  product?: OrderByProductInput;

  @Field(() => OrderByWarehouseInput, { nullable: true })
  warehouse?: OrderByWarehouseInput;

  @Field(() => OrderDirection, { nullable: true })
  quantity?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;
}
