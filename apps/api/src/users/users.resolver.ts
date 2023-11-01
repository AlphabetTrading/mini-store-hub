import { Prisma, UserRole } from '@prisma/client';
import { Resolver, Query, Parent, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { OrderByUserInput, UserOrder } from './dto/user-order.input';
import { PaginationUser } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { FilterUserInput } from './dto/filter-user.input';
import { Warehouse } from 'src/warehouses/models/warehouse.model';
import { CreateUserInput } from './dto/create-user.input';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/common/decorators';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

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

  @HasRoles('ADMIN')
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserbyId(
    @Args('id') userId: string,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.usersService.updateUser(userId, newUserData);
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

  @HasRoles('ADMIN')
  @Mutation(() => User)
  async changeUserPassword(
    @Args('userId') userId: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.usersService.changePasswordByAdmin(userId, newPassword);
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
      type: () => OrderByUserInput,
      nullable: true,
    })
    orderBy?: OrderByUserInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationUser> {
    const where: Prisma.UserWhereInput = {
      AND: [
        {
          id: filterUserInput?.id,
        },
        {
          OR: [
            {
              firstName: filterUserInput?.firstName,
            },
            {
              amharicFirstName: filterUserInput?.firstName,
            },
            {
              lastName: filterUserInput?.lastName,
            },
            {
              amharicLastName: filterUserInput?.lastName,
            },
            {
              phone: filterUserInput?.phone,
            },
          ],
        },
        {
          role: filterUserInput?.role,
        },
        {
          createdAt: filterUserInput?.createdAt,
        },
      ],
    };
    try {
      const users = await this.usersService.getUsers({
        where,
        orderBy,
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
      throw new BadRequestException('Error loading users!');
    }
  }

  // get warehouse from user that manages it
  @Query(() => Warehouse)
  async getWarehouseByManagerId(
    @UserEntity() user: User,
    @Args('userId', {
      type: () => String,
      nullable: true,
    })
    userId,
  ) {
    if (userId) {
      return this.usersService.getWarehouseByUserId(userId);
    }
    const warehouse = await this.usersService.getWarehouseByUserId(user.id);
    if (!warehouse) {
      throw new BadRequestException('User does not manage any warehouse');
    }
    return warehouse;
  }

  // get retailshop from user that manages it
  @Query(() => RetailShop)
  async getRetailShopByManagerId(
    @UserEntity() user: User,
    @Args('userId', {
      type: () => String,
      nullable: true,
    })
    userId,
  ) {
    if (userId) {
      return this.usersService.getRetailShopByUserId(userId);
    }
    const retailShop = await this.usersService.getRetailShopByUserId(user.id);
    if (!retailShop) {
      throw new BadRequestException('User does not manage any retailShop');
    }
    return retailShop;
  }

  @Mutation(() => User)
  async createADMIN(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data, 'ADMIN');
  }

  @HasRoles('ADMIN')
  @UseGuards(RolesGuard)
  @Mutation(() => User)
  async createRetailShopManager(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data, 'RETAIL_SHOP_MANAGER');
  }

  @HasRoles('ADMIN')
  @UseGuards(RolesGuard)
  @Mutation(() => User)
  async createWarehouseManager(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data, 'WAREHOUSE_MANAGER');
  }

  @Mutation(() => User)
  async updateUserRole(
    @Args('userId') userId: string,
    @Args('role') role: UserRole,
  ) {
    return this.usersService.updateUserRole(userId, role);
  }

  @Mutation(() => User)
  async deactivateUser(@Args('userId') userId: string) {
    return this.usersService.changeUserStatus(userId, false);
  }

  @Mutation(() => User)
  async activateUser(@Args('userId') userId: string) {
    return this.usersService.changeUserStatus(userId, true);
  }
}
