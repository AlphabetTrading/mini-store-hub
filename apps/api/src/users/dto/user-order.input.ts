import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum UserOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  password = 'XXXXXXXX',
  firstName = 'XXXXXXXXX',
  lastName = 'XXXXXXXXX',
  phone = 'XXXXXXXXX',
}

registerEnumType(UserOrderField, {
  name: 'UserOrderField',
  description: 'Properties by which user connections can be ordered.',
});

@InputType()
export class UserOrder extends Order {
  field: UserOrderField;
}
