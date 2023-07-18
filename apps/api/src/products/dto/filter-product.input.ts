import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { StringFilter } from 'src/common/filter/string-filter';

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

  @Field(() => StringFilter, { nullable: true })
  category?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
