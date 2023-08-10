import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';
import { OrderByRetailShopInput } from 'src/retail-shops/dto/order-by-retail-shop.input';

export enum SaleTransactionOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(SaleTransactionOrderField, {
  name: 'SaleTransactionOrderField',
  description:
    'Properties by which saleTransaction connections can be ordered.',
});

@InputType()
export class SaleTransactionOrder extends Order {
  @Field(() => SaleTransactionOrderField)
  field: SaleTransactionOrderField;
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderBySaleTransactionItemInput {
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
export class OrderBySaleTransactionInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  totalPrice?: OrderDirection;

  @Field(() => OrderByRetailShopInput, { nullable: true })
  retailShop?: OrderByRetailShopInput;
}
