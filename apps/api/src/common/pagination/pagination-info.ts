import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/models/product.model';
import { RetailShopStock } from 'src/retail-shop-inventories/models/retail-shop-inventory.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  count?: number;
}

@ObjectType()
export class PaginationProducts {
  @Field(() => [Product])
  items: Product[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationRetailShopStocks {
  @Field(() => [RetailShopStock])
  items: RetailShopStock[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}

@ObjectType()
export class PaginationUser {
  @Field(() => [User])
  items: User[];

  @Field(() => PaginationInfo, { nullable: true })
  meta?: PaginationInfo;
}
