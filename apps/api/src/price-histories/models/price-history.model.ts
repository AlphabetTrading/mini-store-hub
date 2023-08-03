import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Product } from 'src/products/models/product.model';
import { SaleTransactionItem } from 'src/sale-transactions/models/sale-transaction-item.model';

@ObjectType()
export class PriceHistory extends BaseModel {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  purchasedPrice: number;

  // @Field({ name: 'product_created_at' })
  // productCreatedAt: Date;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => Product, { nullable: true })
  activeProduct?: Product;

  @Field(() => [SaleTransactionItem], { nullable: true })
  saleTransactionItems?: SaleTransactionItem[];
}
