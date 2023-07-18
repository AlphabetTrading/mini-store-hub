import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterProductInput } from 'src/products/dto/filter-product.input';

@InputType()
export class FilterRetailShopStockInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  retailShopId: string;

  @Field(() => FilterProductInput, { nullable: true })
  product?: FilterProductInput;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
