import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterProductInput } from 'src/products/dto/filter-product.input';

@InputType()
export class FilterPriceHistoryInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => FilterProductInput, { nullable: true })
  product: Prisma.ProductWhereInput;
}
