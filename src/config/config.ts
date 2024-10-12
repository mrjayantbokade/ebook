import {config as conf, config} from "dotenv";

conf();

export const _config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  DB_NAME: process.env.DB_NAME
  
};

export const configuration = Object.freeze(_config);
