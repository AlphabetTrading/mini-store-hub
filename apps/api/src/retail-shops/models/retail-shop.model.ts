import { ObjectType, Field } from '@nestjs/graphql';
import { Address } from 'src/common/models/address.model';
import { BaseModel } from 'src/common/models/base.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { AnnualTransaction } from 'src/sale-transactions/models/annual-transaction';
import { DailyTransaction } from 'src/sale-transactions/models/daily-transaction';
import { MonthlyTransaction } from 'src/sale-transactions/models/monthly-transaction';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class RetailShop extends BaseModel {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => User, { nullable: true })
  retailShopManager?: User;

  @Field(() => [SaleTransaction])
  saleTransaction?: SaleTransaction[];

  @Field(() => [RetailShopStock])
  retailShopStock?: RetailShopStock[];

  @Field(() => [GoodsTransfer])
  goodsTransfersAsDestination?: GoodsTransfer[];

  @Field(() => [DailyTransaction])
  dailyTransaction?: DailyTransaction[];

  @Field(() => [MonthlyTransaction])
  monthlyTransaction?: MonthlyTransaction[];

  @Field(() => [AnnualTransaction])
  annualTransaction?: AnnualTransaction[];
}
