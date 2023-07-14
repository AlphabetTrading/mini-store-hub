// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { NestFactory } from '@nestjs/core';
// import { Callback, Context, Handler } from 'aws-lambda';
// import serverlessExpress from '@vendia/serverless-express';
// import { AppModule } from './app.module';
// import type { CorsConfig } from 'src/common/configs/config.interface';

// import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

// let cachedServer: Handler;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(
//     '/graphql',
//     graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }),
//   );

//   app.setGlobalPrefix('api');

//   // Validation
//   app.useGlobalPipes(new ValidationPipe());
//   const configService = app.get(ConfigService);
//   const corsConfig = configService.get<CorsConfig>('cors');

//   // Cors
//   if (corsConfig.enabled) {
//     app.enableCors();
//   }
//   await app.init();
//   const expressApp = app.getHttpAdapter().getInstance();
//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   cachedServer = cachedServer ?? (await bootstrap());
//   return cachedServer(event, context, callback);
// };
