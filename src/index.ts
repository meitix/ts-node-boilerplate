/**
 * Node.js entry point for launching the server.
 * This file should contain all required configuration for running application.
 */

import { ApplicationServer } from './application.server';
import { config as envConfig } from 'dotenv-flow';
import { applicationLogger, requestLogger } from './logger';

envConfig();
const config = extractConfig(process.env);
applicationLogger.info('application is using the following configurations:', config);

const application = new ApplicationServer({dbConfig: config.dbConfig, logger: applicationLogger as any});

/**
 * Enable documentation on /docs route in development mode.
 * Also we will log all incoming requests and outgoing responses on production server.
 */
if (config.mode !== 'prod' && config.mode !== 'production') {
  application.enableDocumentation('/docs');
} else {
  application.enableRequestLogging(requestLogger as any);
}


/** Start the server */
application.start(config.port || 3000);

/** Cleaning application for testing */
if (config.mode === 'test') {
  application.clean();
}

/**
 * We need to export the app for testing purposes.
 */
export default application.app;

/**
 * extract environment variables and return it as an object.
 * @param env process.env
 */
function extractConfig(env: any) {
  return {
    mode: env.NODE_ENV || 'dev',
    port: env.PORT,
    dbConfig: {
      type: env.DB_TYPE as 'mysql' | 'mssql',
      host: env.DB_HOST,
      database: env.DB_NAME,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      synchronize: eval(env.DB_SYNC)
    }
  };
}