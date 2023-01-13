import { Temporal } from "@js-temporal/polyfill";
import { TextMessageEvent } from "ts3-nodejs-library";
import { DBClient } from "../database/database";
import logging from "../logging/logging";
import { convertTargetMode, MessageAdd, Targetmode } from "../types/messages";
import commandHandler from "./command";

let ignoreCMDs: boolean = false;

export const setIgnoreCMDs = (value: boolean): void => {
  ignoreCMDs = value;
  console.log(`Ignoring commands: ${ignoreCMDs}`);
  logging.logger.info(`Ignoring commands: ${ignoreCMDs}`);
};

const messageHandler = async (
  msg: TextMessageEvent,
  db: DBClient
): Promise<string> => {
  let addMsg: MessageAdd = {
    InvokerNick: msg.invoker.nickname,
    InvokerDBID: Number(msg.invoker.databaseId),
    InvokerUID: msg.invoker.uniqueIdentifier,
    InvokerIP: msg.invoker.connectionClientIp,
    Message: msg.msg,
    Targetmode: convertTargetMode(msg.targetmode),
    DateTime: Temporal.Now.plainDateTimeISO(),
  };

  let addMsgRes = await db.addMessage(addMsg);
  if (addMsgRes instanceof Error) {
    console.error(`Error adding message to database: ${addMsgRes.message}`);
    logging.logger.error(
      `Error adding message to database: ${addMsgRes.message}`
    );
  }

  if (msg.msg.startsWith("!")) {
    if (ignoreCMDs === true) {
      return "";
    }
    let cmdReturn: string = await commandHandler(msg, db);
    return cmdReturn;
  }

  return "";
};

export default messageHandler;
