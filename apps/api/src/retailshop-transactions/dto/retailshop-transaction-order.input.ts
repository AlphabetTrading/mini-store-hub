import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';
import { OrderByRetailShopInput } from 'src/retail-shops/dto/order-by-retail-shop.input';

export enum RetailShopTransactionOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(RetailShopTransactionOrderField, {
  name: 'RetailShopTransactionOrderField',
  description:
    'Properties by which retailShopTransaction connections can be ordered.',
});

@InputType()
export class RetailShopTransactionOrder extends Order {
  @Field(() => RetailShopTransactionOrderField)
  field: RetailShopTransactionOrderField;
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByRetailShopTransactionItemInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  quantity?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  subTotal?: OrderDirection;
}

@InputType()
export class OrderByRetailShopTransactionInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  totalPrice?: OrderDirection;

  @Field(() => OrderByRetailShopInput, { nullable: true })
  retailShop?: OrderByRetailShopInput;
}
