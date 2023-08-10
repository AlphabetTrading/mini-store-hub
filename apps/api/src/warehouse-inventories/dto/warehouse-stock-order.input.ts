import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum WarehouseStockOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
  ['product.name'] = 'product.name',
}

registerEnumType(WarehouseStockOrderField, {
  name: 'WarehouseStockOrderField',
  description: 'Properties by which warehouseStock connections can be ordered.',
});

@InputType()
export class WarehouseStockOrder extends Order {
  @Field(() => WarehouseStockOrderField)
  field: WarehouseStockOrderField;
}
