import dotenv from "dotenv";
dotenv.config();

const server = {
  PORT: process.env.PORT,
};

const database = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE: process.env.POSTGRES_DB,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
};

export { server, database };
