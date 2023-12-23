import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Product } from 'src/products/models/product.model';
import { RetailShopTransaction } from './retailshop-transaction.model';
import { PriceHistory } from 'src/price-histories/models/price-history.model';
import { TransactionType } from '@prisma/client';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'TransactionType role',
});

@ObjectType()
export class RetailShopTransactionItem extends BaseModel {
  @Field(() => String)
  retailShopStockId: string;

  @Field(() => RetailShopStock, { nullable: true })
  retailShopStock?: RetailShopStock;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  sellingPrice: number;

  @Field(() => Float)
  purchasePrice: number;

  @Field(() => Float)
  subTotal: number;

  @Field(() => String)
  retailShopTransactionId: string;

  @Field(() => RetailShopTransaction)
  retailShopTransaction?: RetailShopTransaction;

  @Field(() => TransactionType)
  transactionType: TransactionType;
}


// id                      String                @id @default(uuid())
// createdAt               DateTime              @default(now())
// updatedAt               DateTime              @updatedAt
// retailShopTransactionId String
// quantity                Float
// transactionType         TransactionType
// purchasePrice           Float
// sellingPrice            Float
// subTotal                Float
// retailShopStockId       String
// retailShopStock         RetailShopStock       @relation("RetailShopStock_RetailShopTransactionItem", fields: [retailShopStockId], references: [id])
// retailShopTransaction   RetailShopTransaction @relation("RetailShopStockTransaction_RetailShopTransactionItem", fields: [retailShopTransactionId], references: [id])
