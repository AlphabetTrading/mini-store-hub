import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from 'src/common/filter/date-filter';
import { StringFilter } from 'src/common/filter/string-filter';
import { FilterUserInput } from 'src/users/dto/filter-user.input';

@InputType()
export class FilterNotificationInput {
  @Field({ nullable: true })
  id?: string;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  body?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => FilterUserInput, { nullable: true })
  createdBy?: FilterUserInput;
}
