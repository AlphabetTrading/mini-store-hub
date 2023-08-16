import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { FilterCategoryInput } from 'src/categories/dto/filter-category.input';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { StringFilter } from 'src/common/filter/string-filter';
import { FilterRetailShopInput } from 'src/retail-shops/dto/filter-retail-shop.input';
import { FilterWarehouseInput } from 'src/warehouses/dto/filter-warehouse.input';

@InputType()
export class FilterProductInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  serialNumber?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => FilterCategoryInput, { nullable: true })
  category?: Prisma.CategoryWhereInput;

  @Field(() => FilterRetailShopInput, { nullable: true })
  retailShop?: Prisma.RetailShopWhereInput;

  @Field(() => FilterWarehouseInput, { nullable: true })
  warehouse?: Prisma.WarehouseWhereInput;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
