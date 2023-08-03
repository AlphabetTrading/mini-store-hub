import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field(() => String, { nullable: true })
  amharicDescription?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;
}
