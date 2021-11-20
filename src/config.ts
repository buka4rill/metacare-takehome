import dotenv from "dotenv";
dotenv.config();

const server = {
  PORT: process.env.PORT,
};

const database = {
  DATABASE_URL: `${process.env.DATABASE_URL}`,
  DATABASE: `${process.env.DATABASE}`,
  USER: `${process.env.USER}`,
  PASSWORD: `${process.env.PASSWORD}`,
};

export { server, database };
