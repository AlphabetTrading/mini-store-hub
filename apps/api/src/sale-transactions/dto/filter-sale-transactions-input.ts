// import { Field, InputType } from '@nestjs/graphql';
// import { Prisma } from '@prisma/client';
// import { DateTimeFilter } from 'src/common/filter/date-filter';
// import { FilterRetailShopInput } from 'src/retail-shops/dto/filter-retail-shop.input';
// import { FilterSaleTransactionItemInput } from './filter-sale-transactions-item-input';

// @InputType()
// export class FilterSaleTransactionInput {
//   @Field({ nullable: true })
//   id?: string;

//   @Field(() => FilterSaleTransactionItemInput, { nullable: true })
//   saleTransactionsItems?: Prisma.SaleTransactionItemListRelationFilter;

//   @Field(() => FilterRetailShopInput, { nullable: true })
//   retailShop?: Prisma.RetailShopWhereInput;

//   @Field(() => DateTimeFilter, { nullable: true })
//   createdAt?: DateTimeFilter;
// }
