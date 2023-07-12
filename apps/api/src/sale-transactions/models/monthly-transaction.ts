import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

@ObjectType()
export class MonthlyTransaction extends BaseModel {
  @Field({ nullable: true })
  month?: String;

  @Field(() => Float)
  totalSales: number;

  @Field(() => String)
  retailShopId: string;

  @Field(() => RetailShop)
  retailShop?: RetailShop;
}
