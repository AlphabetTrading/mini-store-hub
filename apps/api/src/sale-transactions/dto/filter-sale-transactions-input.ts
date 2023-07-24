import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { StringFilter } from 'src/common/filter/string-filter';
import { FilterProductInput } from 'src/products/dto/filter-product.input';

@InputType()
export class FilterSaleTransactionInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => FilterProductInput, { nullable: true })
  product?: FilterProductInput;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
