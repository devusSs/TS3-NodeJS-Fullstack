import dotenv from "dotenv";

dotenv.config({});

interface ENV {
  DEV_MODE: number | undefined;
  PORT: number | undefined;
  POSTGRES_HOST: string | undefined;
  POSTGRES_PORT: number | undefined;
  POSTGRES_USER: string | undefined;
  POSTGRES_PASSWORD: string | undefined;
  POSTGRES_DB: string | undefined;
  FRONTEND_URL: string | undefined;
  LOGIN_USER: string | undefined;
  LOGIN_PASS: string | undefined;
  BOT_LOGIN: string | undefined;
  BOT_PASS: string | undefined;
  BOT_URL: string | undefined;
  JWT_SECRET: string | undefined;
  REFRESH_SECRET: string | undefined;
}

interface Config {
  DEV_MODE: number;
  PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  FRONTEND_URL: string;
  LOGIN_USER: string;
  LOGIN_PASS: string;
  BOT_LOGIN: string;
  BOT_PASS: string;
  BOT_URL: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
}

const getConfig = (): ENV => {
  return {
    DEV_MODE: process.env.DEV_MODE ? Number(process.env.DEV_MODE) : undefined,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT
      ? Number(process.env.POSTGRES_PORT)
      : undefined,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    FRONTEND_URL: process.env.FRONTEND_URL,
    LOGIN_USER: process.env.LOGIN_USER,
    LOGIN_PASS: process.env.LOGIN_PASS,
    BOT_LOGIN: process.env.BOT_LOGIN,
    BOT_PASS: process.env.BOT_PASS,
    BOT_URL: process.env.BOT_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
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
