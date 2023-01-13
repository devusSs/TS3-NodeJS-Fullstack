import logging from "./logging/logging";
import config from "./config/config";
import newDBClient from "./database/database";
import messageHandler, { setIgnoreCMDs } from "./handlers/message";
import { Temporal } from "@js-temporal/polyfill";
import {
  ClientConnectEvent,
  ClientDisconnectEvent,
  QueryProtocol,
  TeamSpeak,
  TeamSpeakClient,
  TextMessageEvent,
  TextMessageTargetMode,
} from "ts3-nodejs-library";
import { Whoami } from "ts3-nodejs-library/lib/types/ResponseTypes";
import { UserConnect, UserDisconnect } from "./types/users";

const start = async () => {
  const startTime: Temporal.PlainTime = Temporal.Now.plainTimeISO();

  logging.createLogsDirectory();

  const dbClient = await newDBClient();

  await dbClient.testConnection();

  console.log(
    `Successfully connected to Postgres database on ${dbClient.host}:${dbClient.port}`
  );

  logging.logger.info(
    `Successfully connected to Postgres database on ${dbClient.host}:${dbClient.port}`
  );

  await dbClient.makeMigrations();

  const teamspeak = new TeamSpeak({
    host: config.HOST,
    protocol: QueryProtocol.RAW,
    serverport: config.PORT,
    queryport: config.QUERYPORT,
    username: config.LOGINNAME,
    password: config.PASSWORD,
    nickname: config.USERNAME,
  });

  teamspeak.on("ready", async () => {
    const whoami: Whoami = await teamspeak.whoami();
    const clList: TeamSpeakClient[] = await teamspeak.clientList();
    const clNames: string[] = [];
    const clAdmins: TeamSpeakClient[] = [];
    let userCount: number = 0;
    let adminCount: number = 0;

    console.log(
      `Successfully connected to TeamSpeak server on ${config.HOST}:${config.PORT} as ${whoami.clientNickname}`
    );

    logging.logger.info(
      `Successfully connected to TeamSpeak server on ${config.HOST}:${config.PORT} as ${whoami.clientNickname}`
    );

    clList.forEach((cl: TeamSpeakClient) => {
      if (cl.nickname === whoami.clientNickname) {
        return;
      }

      userCount++;
      clNames.push(cl.nickname);

      if (cl.servergroups.includes("6")) {
        clAdmins.push(cl);
      }
    });

    let adminNames: string[] = [];

    clAdmins.map((cl) => {
      adminNames.push(cl.nickname);
    });

    clAdmins.forEach((admin: TeamSpeakClient) => {
      admin.message("Bot is now online!");
      adminCount++;
    });

    if (clNames.length !== 0) {
      console.log(`Clients online: ${userCount}`);
      console.log(`Clients online: ${clNames.join(", ")}`);
    }

    if (adminNames.length !== 0) {
      console.log(`Admins online: ${adminNames.join(", ")}`);
      console.log(`Admins messaged with online message: ${adminCount}`);
    }

    const finishTime: Temporal.PlainTime = Temporal.Now.plainTimeISO();

    const pingAPIStatus = async (): Promise<void> => {
      const resp = await fetch(config.API_URL + "/status/accept", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Hello from the Bot!" }),
      });
      if (resp.status !== 200) {
        console.log(
          `Error posting against API status route: ${resp.status} ; ${resp.statusText}`
        );
      }
    };
    setInterval(pingAPIStatus, 2000);

    console.log(`Init time: ${finishTime.since(startTime).milliseconds} ms`);
  });

  teamspeak.on("close", async () => {
    console.log("Disconnected, trying to reconnect...");
    logging.logger.info("Disconnected, trying to reconnect...");
    await teamspeak.reconnect(-1, 1000);
    console.log("Reconnected!");
    logging.logger.info("Reconnected!");
  });

  teamspeak.on("error", (e: Error) => {
    console.error("[ERROR]", e);
    logging.logger.error("[ERROR]", e);
  });

  teamspeak.on("flooding", () => {
    console.log("Flooding the server, sleeping for about 1 second");
    logging.logger.info("Flooding the server, sleeping for about 1 second");
  });

  teamspeak.on("clientconnect", async (e: ClientConnectEvent) => {
    let user: UserConnect = {
      TSID: e.client.databaseId,
      FirstUsername: e.client.nickname,
      LatestUsername: e.client.nickname,
      FirstIP: e.client.connectionClientIp,
      LatestIP: e.client.connectionClientIp,
      FirstConnection: Temporal.Now.plainDateTimeISO(),
      LatestConnection: Temporal.Now.plainDateTimeISO(),
      Country: e.client.country,
      Version: e.client.version,
      Platform: e.client.platform,
      UniqueID: e.client.uniqueIdentifier,
    };

    if (user.Country === "") {
      user.Country = "unknown or server query";
    }

    await dbClient.addUser(user);
  });

  teamspeak.on("clientdisconnect", async (e: ClientDisconnectEvent) => {
    let user: UserDisconnect = {
      TSID: e.client?.databaseId,
      LatestUsername: e.client?.nickname,
      LatestIP: e.client?.connectionClientIp,
      LatestDisconnect: Temporal.Now.plainDateTimeISO(),
      Country: e.client?.country,
      Version: e.client?.version,
      Platform: e.client?.platform,
    };

    if (user.Country === "") {
      user.Country = "unknown or server query";
    }

    await dbClient.updateUserDC(user);
  });

  teamspeak.on("textmessage", async (e: TextMessageEvent) => {
    let msgReturn: string = await messageHandler(e, dbClient);
    if (msgReturn != "") {
      if (msgReturn === "!botjoin") {
        const whoami: Whoami = await teamspeak.whoami();
        teamspeak.clientMove(whoami.clientId, e.invoker.clid);
        console.log(
          `Bot joined channel ${e.invoker.clid} prompted by user ${e.invoker.uniqueIdentifier}`
        );
        logging.logger.info(
          `Bot joined channel ${e.invoker.clid} prompted by user ${e.invoker.uniqueIdentifier}`
        );
        return;
      }

      teamspeak.sendTextMessage(
        e.invoker.clid,
        TextMessageTargetMode.CLIENT,
        msgReturn
      );
    }
  });
};

start();
