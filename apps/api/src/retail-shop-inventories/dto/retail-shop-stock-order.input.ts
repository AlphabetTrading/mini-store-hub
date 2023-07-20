import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

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
