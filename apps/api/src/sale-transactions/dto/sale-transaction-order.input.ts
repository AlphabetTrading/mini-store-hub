import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

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
