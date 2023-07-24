import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import {
  ForgotPasswordResponse,
  ResetPasswordResponse,
  Token,
} from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from 'src/users/models/user.model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.username = data.username.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(@Args('data') { username, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      username.toLowerCase(),
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async refreshToken(@Args() { refreshToken }: RefreshTokenInput) {
    return this.auth.refreshToken(refreshToken);
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Args('phone') phone: string,
  ): Promise<ForgotPasswordResponse> {
    return this.auth.forgotPassword(phone);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('phone') phone: string,
    @Args('accessToken') accessToken: string,
    @Args('password') password: string,
  ): Promise<ResetPasswordResponse> {
    return this.auth.resetPassword(phone, accessToken, password);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
