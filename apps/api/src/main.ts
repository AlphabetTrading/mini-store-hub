import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import { PrismaService } from './prisma/prisma.service';
// import { PrismaService } from './prisma/prisma.service';
// import { PrismaClientExceptionFilter } from 'nestjs-prisma';

import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }),
  );

  app.setGlobalPrefix('api');

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  // // Prisma Client Exception Filter for unhandled exceptions
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // // Swagger Api
  // if (swaggerConfig.enabled) {
  //   const options = new DocumentBuilder()
  //     .setTitle(swaggerConfig.title || 'Mini Store Hub')
  //     .setDescription(swaggerConfig.description || 'The nestjs API description')
  //     .setVersion(swaggerConfig.version || '1.0')
  //     .build();
  //   const document = SwaggerModule.createDocument(app, options);

  //   SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  // }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(process.env.PORT || nestConfig.port || 5000);
}
bootstrap();
