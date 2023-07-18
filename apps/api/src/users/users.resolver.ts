import { Resolver, Query, Parent, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { PaginationArgs } from 'src/common/pagination/paginations.args';
import { UserOrder } from './dto/user-order.input';
import { SignupInput } from 'src/auth/dto/signup.input';

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
