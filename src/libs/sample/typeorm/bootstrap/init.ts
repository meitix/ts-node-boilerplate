import { createConnection, ConnectionOptions } from 'typeorm';
import  { Sample } from "../entities";

export async function initialize(config: DBConfiguration) {
 return await createConnection({
    ...config,
    logging: false,
    entities: [Sample],
    migrations: ['../migration/**/*.ts'],
    subscribers: ['../subscriber/**/*.ts']
  } as ConnectionOptions);
}

export interface DBConfiguration {
  type: 'mysql' | 'mssql';
  host: string;
  port: number | string;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}
