import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './models/category.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  // @ResolveField('subcategories', () => [Category])
  // subcategories(@Parent() category: Category) {
  //   return this.categoriesService
  //     .findOne(category.id)
  //     .then((c) => c.subcategories);
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async createCategory(@Args('data') data: CreateCategoryInput) {
    return this.categoriesService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
