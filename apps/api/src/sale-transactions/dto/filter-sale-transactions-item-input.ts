import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterProductInput } from 'src/products/dto/filter-product.input';
import { FilterRetailShopInput } from 'src/retail-shops/dto/filter-retail-shop.input';

@InputType()
export class FilterSaleTransactionItemInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => FilterProductInput, { nullable: true })
  product?: Prisma.ProductWhereInput;

  @Field(() => FilterRetailShopInput, { nullable: true })
  retailShop?: Prisma.RetailShopWhereInput;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
