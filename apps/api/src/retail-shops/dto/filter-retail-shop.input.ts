import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { FilterAddressInput } from 'src/common/dtos/address/filter-address.input';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { StringFilter } from 'src/common/filter/string-filter';

@InputType()
export class FilterRetailShopInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => FilterAddressInput, { nullable: true })
  address?: Prisma.AddressWhereInput;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
