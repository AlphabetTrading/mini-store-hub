import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field(() => String, { nullable: true })
  amharicDescription?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
