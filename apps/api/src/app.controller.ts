import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './middlewares/error.middleware';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(AllExceptionsFilter)
  getHello(): string {
    return this.appService.getHello();
  }
}
