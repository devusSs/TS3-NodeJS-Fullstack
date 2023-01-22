import { Client } from "pg";
import config from "../config/config";
import { AddToken, GetToken } from "../types/clients";
import { Command } from "../types/commands";
import { Message } from "../types/messages";
import { User } from "../types/users";
import PINGDATABASE from "./database.base";
import databaseMigrations from "./database.migrations";
import operations from "./database.operations";

export class DBClient {
  #db: Client;
  host: string;
  port: number;

  constructor(dbClient: Client) {
    this.#db = dbClient;
    this.host = dbClient.host;
    this.port = dbClient.port;
  }

  async testConnection(): Promise<void> {
    let result = await this.#db.query(PINGDATABASE);
    if (result.rowCount != 1) {
      throw new Error(
        `database connection not working as expected: ${result.rowCount}`
      );
    }
  }

  async makeMigrations(): Promise<void> {
    await this.#db.query(databaseMigrations.CREATEUSERTABLE);
    await this.#db.query(databaseMigrations.CREATECOMMANDSTABLE);
    await this.#db.query(databaseMigrations.CREATEMESSAGESTABLE);
    await this.#db.query(databaseMigrations.CREATEREFRESHTABLE);
  }

  async getUsers(): Promise<User[] | Error> {
    try {
      let result = await this.#db.query(operations.GetUsers);
      let users: User[] = [];
      for (let row of result.rows) {
        let user: User = {
          ID: row.id,
          TSID: row.ts_id,
          FirstUsername: row.first_username,
          LatestUsername: row.latest_username,
          FirstIP: row.first_ip,
          LatestIP: row.latest_ip,
          FirstConnection: row.first_connection,
          LatestConnection: row.latest_connection,
          LatestDisconnect: row.latest_disconnect,
          Country: row.country,
          Version: row.version,
          Platform: row.platform,
          UniqueID: row.unique_id,
        };
        users.push(user);
      }
      return users;
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
      return err;
    }
  }

  async getCommands(): Promise<Command[] | Error> {
    try {
      let result = await this.#db.query(operations.GetCommands);
      let commands: Command[] = [];
      for (let row of result.rows) {
        let command: Command = {
          ID: row.id,
          Name: row.name,
          Output: row.output,
          Userlevel: row.userlevel,
          Added: row.added,
          UserAdded: row.user_added,
          Edited: row.edited,
          UserEdited: row.user_edited,
        };
        commands.push(command);
      }
      return commands;
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
      return err;
    }
  }

  async getMessages(): Promise<Message[] | Error> {
    try {
      let result = await this.#db.query(operations.GetMessages);
      let messages: Message[] = [];
      for (let row of result.rows) {
        let message: Message = {
          ID: row.id,
          InvokerNick: row.invoker_nick,
          InvokerDBID: row.invoker_dbid,
          InvokerUID: row.invoker_uid,
          InvokerIP: row.invoker_ip,
          Message: row.message,
          Targetmode: row.targetmode,
          DateTime: row.datetime,
        };
        messages.push(message);
      }
      return messages;
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
      return err;
    }
  }

  async addRefreshToken(add: AddToken): Promise<void | Error> {
    try {
      await this.#db.query(operations.AddToken, [
        add.OwnerName,
        add.Token,
        add.Timestamp,
      ]);
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
      return err;
    }
  }

  async deleteRefreshToken(username: string): Promise<void | Error> {
    try {
      await this.#db.query(operations.DeleteToken, [username]);
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
      return err;
    }
  }

  async getRefreshToken(username: string): Promise<GetToken | Error> {
    try {
      let result = await this.#db.query(operations.GetToken, [username]);
      let token: GetToken = {
        ID: result.rows[0].id,
        OwnerName: result.rows[0].ownername,
        Token: result.rows[0].token,
        Timestamp: result.rows[0].added,
      };
      return token;
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
      return err;
    }
  }
}

const newDBClient = async (): Promise<DBClient> => {
  const client = new Client({
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
  });
  await client.connect();
  return new DBClient(client);
};

export default newDBClient;
