import "reflect-metadata";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { database as db } from "./config";
import path from "path";
import dotenv from "dotenv";
import { Comments } from "./entities/Comments";
dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
  driverOptions: {
    connection: __prod__
      ? {
          ssl: { rejectUnauthorized: false },
        }
      : {},
  },
  entities: [Comments],
  dbName: __prod__ ? db.DATABASE : "metacareapi",
  user: __prod__ ? db.USER : "postgres",
  password: __prod__ ? db.PASSWORD : "password",
  clientUrl: db.DATABASE_URL,
  type: "postgresql",
  debug: !__prod__, // Debug on, when not in prod
} as Parameters<typeof MikroORM.init>[0];
