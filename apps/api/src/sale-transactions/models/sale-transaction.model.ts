import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';
import { SaleTransactionItem } from './sale-transaction-item.model';

@ObjectType()
export class SaleTransaction extends BaseModel {
  @Field(() => [SaleTransactionItem])
  saleTransactionItems?: SaleTransactionItem[];

  @Field(() => Float)
  totalPrice: number;

  @Field(() => String)
  retailShopId: string;

  @Field(() => RetailShop)
  retailShop?: RetailShop;
}
