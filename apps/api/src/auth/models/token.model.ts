import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType()
export class Token {
  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  accessToken: string;

  @Field(() => GraphQLJWT, { description: 'JWT refresh token' })
  refreshToken: string;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field(() => Boolean, { description: 'Password Reset' })
  success: boolean;

  @Field(() => String, { description: 'Email sent' })
  message: string;

  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  accessToken: string;
}

@ObjectType()
export class ResetPasswordResponse {
  @Field(() => Boolean, { description: 'Password Reset' })
  success: boolean;

  @Field(() => String, { description: 'Password Reset message' })
  message: string;

  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  accessToken: string;
}
