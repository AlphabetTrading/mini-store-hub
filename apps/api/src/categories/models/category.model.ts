import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Category extends BaseModel {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => Category, { nullable: true })
  parent?: Category;

  @Field(() => [Category], { nullable: true })
  subcategories?: Category[];

  @Field(() => [Category], { nullable: true })
  products?: Category[];
}
