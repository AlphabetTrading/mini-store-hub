import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterRetailShopInput } from 'src/retail-shops/dto/filter-retail-shop.input';
import { FilterRetailShopTransactionItemInput } from './filter-retailshop-transactions-item-input';

@InputType()
export class FilterRetailShopTransactionInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => FilterRetailShopTransactionItemInput, { nullable: true })
  retailShopTransactionsItems?: Prisma.RetailShopTransactionItemListRelationFilter;

  @Field(() => FilterRetailShopInput, { nullable: true })
  retailShop?: Prisma.RetailShopWhereInput;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
