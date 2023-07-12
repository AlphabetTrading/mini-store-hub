import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserIdArgs } from 'src/categories/args/user-ids.args';
import { PaginationArgs } from 'src/common/pagination/paginations.args';
import { Prisma } from '@prisma/client';
import { SignupInput } from 'src/auth/dto/signup.input';

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

  async createWarehouseManager(payload: SignupInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'WAREHOUSE_MANAGER',
        },
      });

      return {
        userId: user.id,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `Username/Phone ${payload.phone} already used.`,
        );
      }
      throw new Error(e);
    }
  }

  async createRetailShopManager(payload: SignupInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'RETAIL_SHOP_MANAGER',
        },
      });

      return {
        userId: user.id,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `Username/Phone ${payload.phone} already used.`,
        );
      }
      throw new Error(e);
    }
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
    return this.prisma.user.findMany({
      skip,
      include: { userProfile: { include: { address: true } } },
    });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { userProfile: { include: { address: true } } },
    });
  }

  async getUserByEmail(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: { userProfile: { include: { address: true } } },
    });
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
