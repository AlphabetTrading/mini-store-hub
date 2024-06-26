import { ObjectType } from '@nestjs/graphql';
import { Token } from './token.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
