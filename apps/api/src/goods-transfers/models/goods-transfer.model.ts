import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class GoodsTransfer extends BaseModel {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
