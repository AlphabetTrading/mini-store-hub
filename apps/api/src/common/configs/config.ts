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
};

export default (): Config => config;
