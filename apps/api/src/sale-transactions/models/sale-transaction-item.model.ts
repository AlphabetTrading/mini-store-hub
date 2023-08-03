import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Product } from 'src/products/models/product.model';
import { SaleTransaction } from './sale-transaction.model';
import { PriceHistory } from 'src/price-histories/models/price-history.model';

@ObjectType()
export class SaleTransactionItem extends BaseModel {
  @Field(() => String)
  productId: string;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => Float)
  quantity: number;

  // sold price
  @Field(() => String)
  soldPriceHistoryId: string;

  @Field(() => PriceHistory, { nullable: true })
  soldPrice?: PriceHistory;

  @Field(() => Float)
  subTotal: number;

  @Field(() => SaleTransaction)
  saleTransaction?: SaleTransaction;
}
