import { config } from 'dotenv';

export interface Environment {
  PORT: string;
  JWTSECRET: string;
  DBNAME: string;
  DBPORT: number;
  DBUSER: string;
  DBPASS: string;
  DBURI: string;
}

const getDefaultConfig = (): Environment => {
  config();
  return {
    DBNAME: process.env['DB_NAME'],
    DBUSER: process.env['DB_USER'],
    DBPASS: process.env['DB_PASS'],
    DBPORT: Number(process.env['DB_PORT']),
    DBURI: process.env['DB_URI'],
    PORT: process.env['APP_PORT'],
    JWTSECRET: process.env['JWT_SECRET']
  };
};

export const getConfig = (): Environment => {
  // this can be extended to implement a remote secret vault
  return getDefaultConfig();
}

export const envProvider = [{
  provide: 'ENVIRONMENT_CONFIG',
  useFactory: async (): Promise<Environment> => {
    return getConfig();
  }
}];