import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class StringFilter {
  @Field({ nullable: true })
  equals?: string;

  @Field({ nullable: true })
  contains?: string;

  @Field({ nullable: true })
  startsWith?: string;

  @Field({ nullable: true })
  endsWith?: string;

  @Field({ nullable: true })
  not?: string;

  @Field({ nullable: true })
  mode: Prisma.QueryMode = Prisma.QueryMode.insensitive;
}
