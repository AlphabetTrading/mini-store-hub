import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Product } from './product.model';

@ObjectType()
export class ProductRankWithExtraInfo extends Product {
  @Field(() => Float, { nullable: true })
  value?: number;
}
