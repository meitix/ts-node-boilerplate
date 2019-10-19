import { DBConfiguration , initialize } from '../libs/sample/typeorm';

export const initializeDatabase = async (config: DBConfiguration) => {
    await initialize(config);
};

export type DBConfiguration = DBConfiguration;