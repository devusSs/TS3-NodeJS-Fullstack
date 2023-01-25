import newDBClient, { DBClient } from "./database/database";
import express, { Express } from "express";
import config from "./config/config";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

import { defaultRoute, invalidateBotStatus } from "./routes/home";
import { userRoutes } from "./routes/users";
import { commandRoutes } from "./routes/commands";
import { messagesRoutes } from "./routes/messages";
import { clientRoutes } from "./routes/clients";

const start = async () => {
  const db: DBClient = await newDBClient();

  await db.testConnection();

  await db.makeMigrations();

  console.log(
    `Successfully connected to Postgres database on ${db.host}:${db.port}`
  );

  const app: Express = express();

  app.use(express.json());
  app.use(cookieParser());

  let corsOptions: CorsOptions = {
    origin: config.FRONTEND_URL,
    methods: `GET,POST,DELETE`,
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  app.set("db", db);

  app.use("/", defaultRoute);
  app.use("/clients", clientRoutes);

  // TODO: add more routes to query single users, commands, messages or filter them
  app.use("/users", userRoutes);
  app.use("/commands", commandRoutes);
  app.use("/messages", messagesRoutes);

  setInterval(invalidateBotStatus, 5000);

  app.listen(config.PORT, () => {
    console.log(`API is running at http://localhost:${config.PORT}`);
  });
};

start();
