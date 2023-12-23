import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { RetailShopTransactionItem } from './retailshop-transaction-item.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

@ObjectType()
export class RetailShopTransaction extends BaseModel {
  @Field(() => String)
  retailShopId: string;

  @Field(() => RetailShop)
  retailShop?: RetailShop;

  @Field(() => [RetailShopTransactionItem])
  retailShopTransactionItems?: RetailShopTransactionItem[];
}
