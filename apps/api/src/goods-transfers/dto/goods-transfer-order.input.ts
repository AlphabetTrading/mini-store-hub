import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';
import { OrderDirection } from 'src/common/order/order-direction';
import { OrderByRetailShopInput } from 'src/retail-shops/dto/order-by-retail-shop.input';
import { OrderByWarehouseInput } from 'src/warehouses/dto/warehouse-order.input';

export enum GoodsTransferOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(GoodsTransferOrderField, {
  name: 'GoodsTransferOrderField',
  description: 'Properties by which goodsTransfer connections can be ordered.',
});

@InputType()
export class GoodsTransferOrder extends Order {
  @Field(() => GoodsTransferOrderField)
  field: GoodsTransferOrderField;
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});

@InputType()
export class OrderByGoodsTransferInput {
  @Field(() => OrderDirection, { nullable: true })
  createdAt?: OrderDirection;

  @Field(() => OrderDirection, { nullable: true })
  updatedAt?: OrderDirection;

  @Field(() => OrderByWarehouseInput, { nullable: true })
  destinationWarehouse?: OrderByWarehouseInput;

  @Field(() => OrderByWarehouseInput, { nullable: true })
  sourceWarehouse?: OrderByWarehouseInput;

  @Field(() => OrderDirection, { nullable: true })
  transferType?: OrderDirection;

  @Field(() => OrderByRetailShopInput, { nullable: true })
  retailShop?: OrderByRetailShopInput;
}
