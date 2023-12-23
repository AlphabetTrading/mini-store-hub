import { Field, InputType } from '@nestjs/graphql';
import { Prisma, TransactionType } from '@prisma/client';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { FilterProductInput } from 'src/products/dto/filter-product.input';
import { FilterRetailShopStockInput } from 'src/retail-shop-inventories/dto/filter-retail-shop-stock.input';
import { FilterRetailShopInput } from 'src/retail-shops/dto/filter-retail-shop.input';

@InputType()
export class FilterRetailShopTransactionItemInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => FilterRetailShopStockInput, { nullable: true })
  retailShopStock?: Prisma.RetailShopStockWhereInput;

  @Field(()=> TransactionType, { nullable: true })
  transactionType?: TransactionType;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
