import { Resolver, Query, Parent, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { PaginationArgs } from 'src/common/pagination/paginations.args';
import { UserOrder } from './dto/user-order.input';
import { SignupInput } from 'src/auth/dto/signup.input';
import { PaginationUser } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { FilterUserInput } from './dto/filter-user.input';
import { Prisma } from '@prisma/client';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword,
    );
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Query(() => PaginationUser)
  async users(
    @Args('filterUserInput', {
      type: () => FilterUserInput,
      nullable: true,
    })
    filterUserInput?: FilterUserInput,
    @Args('orderBy', {
      type: () => UserOrder,
      nullable: true,
    })
    orderBy?: UserOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationUser> {
    const where: Prisma.UserWhereInput = {
      id: filterUserInput?.id,
      firstName: filterUserInput?.firstName,
      lastName: filterUserInput?.lastName,
      phone: filterUserInput?.phone,
      createdAt: filterUserInput?.createdAt,
    };
    try {
      const users = await this.usersService.getUsers({
        where,
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.usersService.count(where);
      return {
        items: users,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => [User])
  async retailShopManagers(@Parent() user: User) {
    return this.usersService.getRetailManagers();
  }

  @Query(() => [User])
  async warehouseManagers(@Parent() user: User) {
    return this.usersService.getRetailManagers();
  }

  @Mutation(() => User)
  async createRetailShopManager(@Args('data') data: SignupInput) {
    return this.usersService.createRetailShopManager(data);
  }

  @Mutation(() => User)
  async createWarehouseManager(@Args('data') data: SignupInput) {
    return this.usersService.createWarehouseManager(data);
  }
}
