import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum ProductOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
  serialNumber = 'serialNumber',
  category = 'name',
}

registerEnumType(ProductOrderField, {
  name: 'ProductOrderField',
  description: 'Properties by which product connections can be ordered.',
});

@InputType()
export class ProductOrder extends Order {
  @Field(() => ProductOrderField)
  field: ProductOrderField;
}
