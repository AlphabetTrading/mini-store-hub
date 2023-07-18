import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DateTimeFilter {
  @Field(() => Date, { nullable: true })
  equals?: Date;

  @Field(() => Date, { nullable: true })
  lt?: Date;

  @Field(() => Date, { nullable: true })
  lte?: Date;

  @Field(() => Date, { nullable: true })
  gt?: Date;

  @Field(() => Date, { nullable: true })
  gte?: Date;
}
