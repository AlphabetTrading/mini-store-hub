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
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/common/decorators';
import { Prisma, UserRole } from '@prisma/client';
import { PaginationCategories } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { FilterCategoryInput } from './dto/filter-category.input';
import { OrderByCategoryInput } from './dto/order-by-category.input';

@Resolver(() => Category)
@UseGuards(GqlAuthGuard)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => PaginationCategories)
  async categories(
    @Args('filterCategoryInput', {
      type: () => FilterCategoryInput,
      nullable: true,
    })
    filterCategoryInput?: FilterCategoryInput,
    @Args('orderBy', {
      type: () => OrderByCategoryInput,
      nullable: true,
    })
    orderBy?: OrderByCategoryInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationCategories> {
    const where: Prisma.CategoryWhereInput = {
      AND: [
        {
          id: filterCategoryInput?.id,
        },
        {
          OR: [
            {
              name: filterCategoryInput?.name,
            },
            {
              amharicName: filterCategoryInput?.name,
            },
            {
              subcategories: {
                some: filterCategoryInput?.subcategories,
              },
            },
            {
              description: filterCategoryInput?.description,
            },
          ],
        },

        {
          createdAt: filterCategoryInput?.createdAt,
        },
      ],
    };

    const categories = await this.categoriesService.findAll({
      where,
      orderBy,
      skip: paginationInput?.skip,
      take: paginationInput?.take,
    });

    const totalCategories = await this.categoriesService.count(where);

    return {
      items: categories,
      meta: {
        count: totalCategories,
        limit: paginationInput?.take,
        page: paginationInput?.skip
          ? Math.floor(paginationInput?.skip / paginationInput?.take) + 1
          : 1,
      },
    };
  }

  @Query(() => Category, { name: 'category' })
  async category(@Args('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ResolveField('subcategories', () => [Category])
  subcategories(@Parent() category: Category) {
    return this.categoriesService
      .findOne(category.id)
      .then((c) => c.subcategories);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Category)
  async createCategory(@Args('data') data: CreateCategoryInput) {
    return this.categoriesService.create(data);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(id, data);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
