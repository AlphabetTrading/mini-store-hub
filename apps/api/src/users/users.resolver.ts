import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { PaginationArgs } from 'src/common/pagination/paginations.args';
import { UserIdArgs } from 'src/categories/args/user-ids.args';
import { UserOrder } from './dto/user-order.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

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

  @UseGuards(GqlAuthGuard)
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

  @Query(() => [User])
  async users(
    @Args() paginationArgs: PaginationArgs,

    @Args({
      name: 'orderBy',
      type: () => UserOrder,
      nullable: true,
    })
    orderBy: UserOrder,
  ) {
    return this.usersService.getUsers(paginationArgs);
  }

  @Query(() => [User])
  async retailManagers(@Parent() user: User) {
    return this.usersService.getRetailManagers();
  }

  @Query(() => [User])
  async warehouseManagers(@Parent() user: User) {
    return this.usersService.getRetailManagers();
  }
}
