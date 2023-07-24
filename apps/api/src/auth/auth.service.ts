import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER',
        },
      });

      return this.generateTokens({
        userId: user.id,
      });
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

  async createWarehouseManager(payload: SignupInput): Promise<Token> {
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

      return this.generateTokens({
        userId: user.id,
      });
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

  async createRetailShopManager(payload: SignupInput): Promise<Token> {
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

      return this.generateTokens({
        userId: user.id,
      });
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

  async login(username: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${username}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: securityConfig.expiresIn,
    });
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async forgotPassword(phone: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { phone } });

      if (!user) {
        throw new NotFoundException(`No user found for phone: ${phone}`);
      }

      const securityConfig = this.configService.get<SecurityConfig>('security');

      const payload = { phone };
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_RESET_PASSWORD_SECRET'),
        expiresIn: securityConfig.expiresIn,
      });

      return {
        success: true,
        message: 'Reset password link sent to your phone',
        accessToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async resetPassword(phone: string, accessToken: string, password: string) {
    try {
      const { phone: tokenPhone } = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_RESET_PASSWORD_SECRET'),
      });

      if (tokenPhone !== phone) {
        throw new BadRequestException('Invalid code');
      }

      const hashedPassword = await this.passwordService.hashPassword(password);

      await this.prisma.user.update({
        where: { phone },
        data: { password: hashedPassword },
      });

      return {
        success: true,
        message: 'Password reset successfully',
        accessToken,
      };
    } catch (e) {
      throw new NotFoundException(`No user found for token: ${accessToken}`);
    }
  }
}
