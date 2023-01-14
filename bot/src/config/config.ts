import dotenv from "dotenv";

dotenv.config({});

interface ENV {
  HOST: string | undefined;
  PORT: number | undefined;
  QUERYPORT: number | undefined;
  LOGINNAME: string | undefined;
  PASSWORD: string | undefined;
  USERNAME: string | undefined;
  OWNERUID: string | undefined;
  POSTGRES_HOST: string | undefined;
  POSTGRES_PORT: number | undefined;
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_DB: string | undefined;
  API_URL: string | undefined;
  FRONTEND_URL: string | undefined;
}

interface Config {
  HOST: string;
  PORT: number;
  QUERYPORT: number;
  LOGINNAME: string;
  PASSWORD: string;
  USERNAME: string;
  OWNERUID: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  API_URL: string;
  FRONTEND_URL: string;
}

const getConfig = (): ENV => {
  return {
    HOST: process.env.HOST,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    QUERYPORT: process.env.QUERYPORT
      ? Number(process.env.QUERYPORT)
      : undefined,
    LOGINNAME: process.env.LOGINNAME,
    PASSWORD: process.env.PASSWORD,
    USERNAME: process.env.USERNAME,
    OWNERUID: process.env.OWNERUID,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT
      ? Number(process.env.POSTGRES_PORT)
      : undefined,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    API_URL: process.env.API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
