import { ObjectType, Field, Float } from '@nestjs/graphql';
import { RetailShop } from './retail-shop.model';

@ObjectType()
export class RetailShopWithExtraInfo extends RetailShop {
  @Field(() => Float, { nullable: true })
  totalSales?: number;

  @Field(() => Float, { nullable: true })
  totalProfit?: number;

  @Field(() => Float, { nullable: true })
  totalTransactions?: number;
}
