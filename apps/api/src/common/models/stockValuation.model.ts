import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StockValuation {
  @Field(() => Float, { nullable: true })
  totalValuation?: number;

  @Field(() => Float, { nullable: true })
  totalQuantity?: number;

  @Field(() => Float, { nullable: true })
  count?: number;
}
