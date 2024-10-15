import {config as conf, config} from "dotenv";

conf();

export const _config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  DB_NAME: process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SERCRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
   
  
};

export const configuration = Object.freeze(_config);
