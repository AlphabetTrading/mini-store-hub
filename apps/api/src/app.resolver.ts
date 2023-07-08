import { Injectable } from '@nestjs/common';

@Injectable()
export class AppResolver {
  getHello(): string {
    return 'Hello World!!';
  }
}
