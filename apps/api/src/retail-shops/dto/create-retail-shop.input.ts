import { InputType, Field } from '@nestjs/graphql';
import { Address } from 'src/common/models/address.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { AnnualTransaction } from 'src/sale-transactions/models/annual-transaction';
import { DailyTransaction } from 'src/sale-transactions/models/daily-transaction';
import { MonthlyTransaction } from 'src/sale-transactions/models/monthly-transaction';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';
import { User } from 'src/users/models/user.model';

@InputType()
export class CreateRetailShopInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;
}
