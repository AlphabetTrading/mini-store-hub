import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { SaleTransactionsService } from './sale-transactions.service';
import { SaleTransaction } from './models/sale-transaction.model';
import { CreateSaleTransactionInput } from './dto/create-sale-transaction.input';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver()
export class SaleTransactionsResolver {
  constructor(
    private readonly saleTransactionsService: SaleTransactionsService, // private readonly RetailShopStockService: RetailShopStock,
  ) {}

  @Query(() => [SaleTransaction], { name: 'saleTransactions' })
  async findAll(): Promise<SaleTransaction[]> {
    return this.saleTransactionsService.findAll();
  }

  @Query(() => SaleTransaction, { name: 'saleTransaction' })
  async findOne(id: string): Promise<SaleTransaction> {
    return this.saleTransactionsService.findOne(id);
  }

  @Query(() => [SaleTransaction], { name: 'saleTransactionsByRetailShop' })
  async findAllByRetailShop(id: string): Promise<SaleTransaction[]> {
    return this.saleTransactionsService.findAllByRetailShop(id);
  }

  @Mutation(() => SaleTransaction)
  async createSaleTransaction(
    @Args('data') data: CreateSaleTransactionInput,
  ): Promise<SaleTransaction> {
    const sales = await this.saleTransactionsService.create(data);

    // check retailShop inventory and update it, and if there is low level of stock notify the retail shop manager and warehouse manager
    // this is done by subscribing to the inventoryUpdated event
    //
    // const inventoryUpdated = await this.RetailShopStockService;
    // console.log(inventoryUpdated);
    //

    pubSub.publish('inventoryUpdated', { inventoryUpdated: { sales } });
    return sales;
  }

  @Mutation(() => SaleTransaction)
  async updateSaleTransaction(
    @Args('id') id: string,
    @Args('data') data: UpdateSaleTransactionInput,
  ) {
    return this.saleTransactionsService.update(id, data);
  }

  @Mutation(() => SaleTransaction)
  async deleteSaleTransaction(@Args('id') id: string) {
    return this.saleTransactionsService.remove(id);
  }

  // @Subscription('inventoryUpdated', () => null)
  // inventoryUpdated() {
  //   return pubSub.asyncIterator('inventoryUpdated');
  // }
}
