import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum CategoryOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
  description = 'description',
}

registerEnumType(CategoryOrderField, {
  name: 'CategoryOrderField',
  description: 'Properties by which category connections can be ordered.',
});

@InputType()
export class CategoryOrder extends Order {
  @Field(() => CategoryOrderField)
  field: CategoryOrderField;
}
