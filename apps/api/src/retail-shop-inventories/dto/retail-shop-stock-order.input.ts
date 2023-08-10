import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';
import { OrderByProductInput } from 'src/products/dto/order-by-product.input';
import { OrderByRetailShopInput } from 'src/retail-shops/dto/order-by-retail-shop.input';

export enum RetailShopStockOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
}

registerEnumType(RetailShopStockOrderField, {
  name: 'RetailShopStockOrderField',
  description:
    'Properties by which retailShopStock connections can be ordered.',
});

@InputType()
export class RetailShopStockOrder extends Order {
  @Field(() => RetailShopStockOrderField)
  field: RetailShopStockOrderField;
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByRetailShopStockInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  quantity?: OrderDirection;

  @Field(() => OrderByProductInput, { nullable: true })
  product?: OrderByProductInput;

  @Field(() => OrderByRetailShopInput, { nullable: true })
  retailShop?: OrderByRetailShopInput;
}
