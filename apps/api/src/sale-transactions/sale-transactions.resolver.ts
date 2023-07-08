import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SaleTransactionsService } from './sale-transactions.service';
import { SaleTransaction } from './models/sale-transaction.model';
import { CreateSaleTransactionInput } from './dto/create-sale-transaction.input';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';

@Resolver()
export class SaleTransactionsResolver {
  constructor(
    private readonly saleTransactionsService: SaleTransactionsService,
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
    return this.saleTransactionsService.create(data);
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
}
