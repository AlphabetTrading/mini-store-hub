import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Product } from 'src/products/models/product.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';
import { SaleTransaction } from './sale-transaction.model';

@ObjectType()
export class SaleTransactionItem extends BaseModel {
  @Field(() => String)
  productId: string;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  subTotal: number;

  @Field(() => SaleTransaction)
  saleTransaction?: SaleTransaction;
}
