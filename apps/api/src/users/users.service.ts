import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserIdArgs } from 'src/categories/args/user-ids.args';
import { PaginationArgs } from 'src/common/pagination/paginations.args';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput,
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }

  async getUsers({ first, last, after, before, skip }: PaginationArgs) {
    return this.prisma.user.findMany({ skip, take: 1 });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getRetailManagers() {
    return this.prisma.user.findMany({
      where: {
        role: 'RETAIL_SHOP_MANAGER',
      },
    });
  }
  async getWarehouseManagers() {
    return this.prisma.user.findMany({
      where: {
        role: 'WAREHOUSE_MANAGER',
      },
    });
  }
}
