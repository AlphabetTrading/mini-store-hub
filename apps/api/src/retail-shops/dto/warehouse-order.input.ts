import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum RetailShopOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
}

registerEnumType(RetailShopOrderField, {
  name: 'RetailShopOrderField',
  description: 'Properties by which retailShop connections can be ordered.',
});

@InputType()
export class RetailShopOrder extends Order {
  @Field(() => RetailShopOrderField)
  field: RetailShopOrderField;
}
