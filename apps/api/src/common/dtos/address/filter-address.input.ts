import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { StringFilter } from 'src/common/filter/string-filter';

@InputType()
export class FilterAddressInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => StringFilter, { nullable: true })
  street?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  city?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  formattedAddress?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
