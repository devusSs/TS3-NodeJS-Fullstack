import newDBClient, { DBClient } from "./database/database";
import express, { Express } from "express";
import config from "./config/config";
import cors from "cors";

import { defaultRoute, invalidateBotStatus } from "./routes/home";
import { userRoutes } from "./routes/users";
import { commandRoutes } from "./routes/commands";
import { messagesRoutes } from "./routes/messages";

const start = async () => {
  const db: DBClient = await newDBClient();

  await db.testConnection();

  console.log(
    `Successfully connected to Postgres database on ${db.host}:${db.port}`
  );

  const app: Express = express();

  app.use(express.json());

  let corsOptions = {
    origin: config.FRONTEND_URL,
    methods: `GET,PATCH,POST`,
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  app.set("db", db);

  app.use("/", defaultRoute);
  // TODO: ADD AUTHORIZATION MIDDLEWARE (JWT)
  app.use("/users", userRoutes);
  app.use("/commands", commandRoutes);
  app.use("/messages", messagesRoutes);

  setInterval(invalidateBotStatus, 5000);

  app.listen(config.PORT, () => {
    console.log(`API is running at http://localhost:${config.PORT}`);
  });
};

start();
