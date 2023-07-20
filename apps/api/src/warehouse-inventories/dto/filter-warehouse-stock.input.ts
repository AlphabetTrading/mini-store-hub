import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterProductInput } from 'src/products/dto/filter-product.input';
import { FilterWarehouseInput } from 'src/warehouses/dto/filter-warehouse.input';

@InputType()
export class FilterWarehouseStockInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => FilterWarehouseInput, { nullable: true })
  warehouse?: FilterWarehouseInput;

  @Field(() => FilterProductInput, { nullable: true })
  product?: FilterProductInput;
}
