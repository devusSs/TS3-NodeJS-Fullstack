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

  let corsOptions: CorsOptions = {
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Content-Length",
      "Accept",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  console.log(`Setup CORS for domain ${corsOptions.origin}`);

  app.use(express.json());
  app.use(cookieParser());

  app.set("db", db);

  app.use("/", defaultRoute);
  app.use("/clients", clientRoutes);

  app.use("/users", userRoutes);
  app.use("/commands", commandRoutes);
  app.use("/messages", messagesRoutes);

  setInterval(invalidateBotStatus, 5000);

  app.listen(config.PORT, () => {
    console.log(`API is running at http://localhost:${config.PORT}`);
  });
};

start();
