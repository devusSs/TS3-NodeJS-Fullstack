import { Client } from "pg";
import config from "../config/config";
import migrations from "./database.migrations";
import operations from "./database.operations";
import PINGDATABASE from "./database.base";
import { UserConnect, UserDisconnect } from "../types/users";
import { Command, CommandAdd, CommandEdit } from "../types/commands";
import { MessageAdd } from "../types/messages";
import logging from "../logging/logging";

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
    await this.#db.query(migrations.CREATEUSERTABLE);
    await this.#db.query(migrations.CREATECOMMANDSTABLE);
    await this.#db.query(migrations.CREATEMESSAGESTABLE);
  }

  async addUser(user: UserConnect): Promise<void> {
    try {
      await this.#db.query(operations.AddUserConnect, [
        user.TSID,
        user.FirstUsername,
        user.LatestUsername,
        user.FirstIP,
        user.LatestIP,
        user.FirstConnection,
        user.LatestConnection,
        user.Country,
        user.Version,
        user.Platform,
        user.UniqueID,
      ]);
    } catch (err: any) {
      if (err instanceof Error) {
        if (
          err.message.includes("duplicate key value violates unique constraint")
        ) {
          await this.updateUser(user);
        } else {
          console.error(`Error addding connected user: ${err}`);
          logging.logger.error(`Error addding connected user: ${err}`);
        }
      } else {
        console.error(`Unknown error updating user on connect: ${err}`);
      }
    }
  }

  async updateUser(user: UserConnect): Promise<void> {
    try {
      await this.#db.query(operations.UpdateUserConnect, [
        user.LatestUsername,
        user.LatestIP,
        user.LatestConnection,
        user.Country,
        user.Version,
        user.Platform,
        user.TSID,
      ]);
    } catch (err: any) {
      console.error(`Error updating connected user: ${err}`);
    }
  }

  async updateUserDC(user: UserDisconnect): Promise<void> {
    try {
      await this.#db.query(operations.UpdateUserDisconnect, [
        user.LatestUsername,
        user.LatestIP,
        user.LatestDisconnect,
        user.Country,
        user.Version,
        user.Platform,
        user.TSID,
      ]);
    } catch (err: any) {
      console.error(`Error updating disconnected user: ${err}`);
    }
  }

  async addCommand(comm: CommandAdd): Promise<string | Error> {
    try {
      let res = await this.#db.query(operations.AddCommand, [
        comm.Name,
        comm.Output,
        comm.Userlevel,
        comm.Added,
        comm.UserAdded,
      ]);
      console.log(`User ${comm.UserAdded} added command ${comm.Name}`);
      logging.logger.info(`User ${comm.UserAdded} added command ${comm.Name}`);
      return `Successfully added command ${comm.Name} (id: ${res.rows[0].id}).`;
    } catch (err: any) {
      return err;
    }
  }

  async getCommand(name: string): Promise<Command | Error> {
    try {
      let res = await this.#db.query(operations.GetCommand, [name]);
      let comm: Command = {
        ID: res.rows[0].id,
        Name: res.rows[0].name,
        Output: res.rows[0].output,
        Userlevel: res.rows[0].userlevel,
        Added: res.rows[0].added,
        UserAdded: res.rows[0].user_added,
        Edited: res.rows[0].edited,
        UserEdited: res.rows[0].user_edited,
      };
      return comm;
    } catch (err: any) {
      return err;
    }
  }

  async editCommand(comm: CommandEdit): Promise<string | Error> {
    try {
      let check: Command | Error = await this.getCommand(comm.Name);
      if (check instanceof Error) {
        if (check.message.includes("undefined")) {
          return `Command ${comm.Name} does not exist.`;
        }
        return check.message;
      }
      let res = await this.#db.query(operations.EditCommand, [
        comm.Output,
        comm.Userlevel,
        comm.Edited,
        comm.UserEdited,
        comm.Name,
      ]);
      console.log(`User ${comm.UserEdited} edited command ${comm.Name}`);
      logging.logger.info(
        `User ${comm.UserEdited} edited command ${comm.Name}`
      );
      return `Successfully edited command ${comm.Name} (id: ${res.rows[0].id}).`;
    } catch (err: any) {
      return err;
    }
  }

  async deleteCommand(uid: string, name: string): Promise<string | Error> {
    try {
      let res: Command | Error = await this.getCommand(name);
      if (res instanceof Error) {
        if (res.message.includes("undefined")) {
          return `Command ${name} does not exist.`;
        }
        return res.message;
      }
      await this.#db.query(operations.DeleteCommand, [name]);
      console.log(`User ${uid} deleted command ${name}`);
      logging.logger.info(`User ${uid} deleted command ${name}`);
      return `Successfully deleted command ${name}.`;
    } catch (err: any) {
      return err;
    }
  }

  async getCommands(): Promise<string[] | Error> {
    try {
      let commands: string[] = [];
      let res = await this.#db.query(operations.GetCommands);
      for (let rowInst of res.rows) {
        let rowComm: Command = {
          ID: rowInst.id,
          Name: rowInst.name,
          Output: rowInst.output,
          Userlevel: rowInst.userlevel,
          Added: rowInst.added,
          UserAdded: rowInst.user_added,
          Edited: rowInst.edited,
          UserEdited: rowInst.user_edited,
        };
        commands.push(rowComm.Name);
      }
      return commands;
    } catch (err: any) {
      return err;
    }
  }

  async addMessage(msg: MessageAdd): Promise<void | Error> {
    try {
      await this.#db.query(operations.AddMessage, [
        msg.InvokerNick,
        msg.InvokerDBID,
        msg.InvokerUID,
        msg.InvokerIP,
        msg.Message,
        msg.Targetmode,
        msg.DateTime,
      ]);
      return;
    } catch (err: any) {
      if (err instanceof Error) {
        return err;
      }
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
