import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';
import { OrderByProductInput } from 'src/products/dto/order-by-product.input';

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

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByPriceHistoryInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  price?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  purchasedPrice?: OrderDirection;

  @Field(() => OrderByProductInput, { nullable: true })
  product?: OrderByProductInput;
}
