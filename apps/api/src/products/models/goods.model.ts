import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { Category } from 'src/categories/models/category.model';
import { BaseModel } from 'src/common/models/base.model';
import { PriceHistory } from 'src/price-histories/models/price-history.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { SaleTransaction } from 'src/sale-transactions/models/sale-transaction.model';
import { WarehouseStock } from 'src/warehouse-inventories/models/warehouse-inventory.model';
import { Product } from './product.model';
import { GoodsTransfer } from 'src/goods-transfers/models/goods-transfer.model';

@ObjectType()
export class Goods extends BaseModel {
  @Field()
  productId: string;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field()
  quantity: number;

  @Field(() => GoodsTransfer)
  goodsTransferId?: string;
}
