import "reflect-metadata";
import express, { Response } from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import { server as SERVER } from "./config";
// import YAML from "yamljs";
import dotenv from "dotenv";
dotenv.config();

import { moviesRouter } from "./routes/movies";
import { commentsRouter } from "./routes/comments";
import { charactersRouter } from "./routes/characters";

//  Swagger UI
import swaggerUI from "swagger-ui-express";
// const swaggerDocument = YAML.load("./src/swagger.yaml");
// import { swaggerDoc } from "./swagger.json";

import swaggerDoc from "./swagger.json";

// server setup
const main = async () => {
  // Connect to PG DB
  const orm = await MikroORM.init(mikroConfig);

  // run migrations
  await orm.getMigrator().up();

  // Initialise Express
  const app = express();

  // Express middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (_, res: Response) => {
    res.send("Hello, this is Metacare API");
  });

  // Inject route
  app.use(moviesRouter);
  app.use(commentsRouter);
  app.use(charactersRouter);

  // Docs
  // app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  // Declare ports & listen to port
  const port = SERVER.PORT || 4000;
  app.listen(port, () => console.log(`Server started on port: ${port}`));
};

// if error, catch and log
main().catch((err) => console.log(err));
