import { UseFilters } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AllExceptionsFilter } from './middlewares/error.middleware';

@Resolver()
@UseFilters(AllExceptionsFilter)
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
