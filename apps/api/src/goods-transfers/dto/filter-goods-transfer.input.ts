import { Field, InputType } from '@nestjs/graphql';
import { TransferType } from '@prisma/client';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterRetailShopInput } from 'src/retail-shops/dto/filter-retail-shop.input';
import { FilterWarehouseInput } from 'src/warehouses/dto/filter-warehouse.input';

@InputType()
export class FilterGoodsTransferInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => FilterWarehouseInput, { nullable: true })
  sourceWarehouse?: FilterWarehouseInput;

  @Field(() => FilterWarehouseInput, { nullable: true })
  destinationWarehouse?: FilterWarehouseInput;

  @Field(() => FilterRetailShopInput, { nullable: true })
  retailShop?: FilterRetailShopInput;

  @Field(() => TransferType, { nullable: true })
  transferType?: TransferType;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
