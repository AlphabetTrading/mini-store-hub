import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { SignupInput } from 'src/auth/dto/signup.input';
import { User } from './models/user.model';

const userIncludeObject: Prisma.UserInclude = {
  userProfile: { include: { address: true } },
  warehouse: true,
  retailShop: true,
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async getWarehouseByUserId(userId: string) {
    return this.prisma.warehouse.findFirst({
      where: {
        warehouseManagerId: userId,
      },
    });
  }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({ where });
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

  async getUsers({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
      include: userIncludeObject,
    });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: userIncludeObject,
    });
  }

  async getUserByEmail(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: userIncludeObject,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getRetailManagers() {
    return this.prisma.user.findMany({
      include: userIncludeObject,
      where: {
        role: 'RETAIL_SHOP_MANAGER',
      },
    });
  }
  async getWarehouseManagers() {
    return this.prisma.user.findMany({
      include: userIncludeObject,
      where: {
        role: 'WAREHOUSE_MANAGER',
      },
    });
  }
}
