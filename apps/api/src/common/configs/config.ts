import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Mini Store Hub',
    description: 'Mini Store Hub API',
    version: '1.5',
    path: 'apii',
  },
  graphql: {
    playgroundEnabled: false,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
    path: 'graphql',
  },
  security: {
    expiresIn: '1d',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  storage: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_S3_URL: process.env.AWS_S3_URL,
  },
};

export default (): Config => config;
