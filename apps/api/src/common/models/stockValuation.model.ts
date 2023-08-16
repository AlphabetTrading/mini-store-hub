// totalValuation: Float;
// totalQuantity: Float;
// count: Float;import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class StockValuation extends BaseModel {
  @Field(() => Float, { nullable: true })
  totalValuation?: number;

  @Field(() => Float, { nullable: true })
  totalQuantity?: number;

  @Field(() => Float, { nullable: true })
  count?: number;
}
