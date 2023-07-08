import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { UseGuards } from '@nestjs/common';
import { Product } from './models/product.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateProductInput } from './dto/create-product.input';
import { CategoriesService } from 'src/categories/categories.service';
import { PriceHistoriesService } from 'src/price-histories/price-histories.service';
import { PriceHistory } from 'src/price-histories/models/price-history.model';
import { Category } from 'src/categories/models/category.model';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly priceHistoryService: PriceHistoriesService,
  ) {}

  @Query(() => [Product], { name: 'products' })
  async products(): Promise<any> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async product(id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Query(() => [Product], { name: 'productsByCategory' })
  async productsByCategory(category: string): Promise<Product[]> {
    return this.productsService.findByCategory(category);
  }

  @Query(() => [Product], { name: 'searchProduct' })
  async searchProduct(@Args('search') term: string): Promise<Product[]> {
    return this.productsService.searchProduct(term);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create(data);
  }

  // @ResolveField('category', () => Category)
  // async category(@Parent() product: Product): Promise<Category> {
  //   return this.productsService.findOne(product.id).then((p) => p.category);
  // }

  // @ResolveField(() => PriceHistory)
  // async activePrice(@Args('activePriceId') id: string): Promise<PriceHistory> {
  //   return this.priceHistoryService.findOne(id);
  // }

  @Mutation(() => Product, { name: 'updateProduct' })
  async updateProduct(
    @Args('id') id: string,
    @Args('data') data: CreateProductInput,
  ) {
    return this.productsService.update(id, data);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
