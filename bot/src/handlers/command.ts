import { Temporal } from "@js-temporal/polyfill";
import { TextMessageEvent, TextMessageTargetMode } from "ts3-nodejs-library";
import { DBClient } from "../database/database";
import { Command, CommandAdd, CommandEdit, Userlevel } from "../types/commands";
import { setIgnoreCMDs } from "./message";
import { isUserAdmin, isUserOwner } from "./user";

const commandHandler = async (
  msg: TextMessageEvent,
  db: DBClient
): Promise<string> => {
  let commSplit: string[] = msg.msg.split(" ");
  let commName: string = commSplit[0].trim();
  let commUserlevel: string = commSplit[commSplit.length - 1].trim();

  if (!(<any>Object).values(Userlevel).includes(commUserlevel.toLowerCase())) {
    commUserlevel = "anyone";
  }

  let commOutput: string = commSplit
    .join(" ")
    .replace(commName, "")
    .replace(commUserlevel, "")
    .trim();

  switch (commName) {
    case "!addcom":
      if (!isUserAdmin(msg.invoker)) {
        return "Only admins are allowed to add commands.";
      }
      commName = commSplit[1];
      let commAdd: CommandAdd = {
        Name: commName,
        Output: commOutput.replace(commName, "").trim(),
        Userlevel: commUserlevel.toLowerCase() as Userlevel,
        Added: Temporal.Now.plainDateTimeISO(),
        UserAdded: msg.invoker.uniqueIdentifier,
      };
      let resAdd: string | Error = await db.addCommand(commAdd);
      if (resAdd instanceof Error) {
        if (resAdd.message.includes("duplicate key value violates")) {
          return `Command ${commName} already exists.`;
        }
        return resAdd.message;
      }
      return resAdd;

    case "!editcom":
      if (!isUserAdmin(msg.invoker)) {
        return "Only admins are allowed to edit commands.";
      }
      commName = commSplit[1];
      let commEdit: CommandEdit = {
        Name: commName,
        Output: commOutput.replace(commName, "").trim(),
        Userlevel: commUserlevel.toLowerCase() as Userlevel,
        Edited: Temporal.Now.plainDateTimeISO(),
        UserEdited: msg.invoker.uniqueIdentifier,
      };
      let resEdit: string | Error = await db.editCommand(commEdit);
      if (resEdit instanceof Error) {
        return resEdit.message;
      }
      return resEdit;

    case "!delcom":
      if (!isUserAdmin(msg.invoker)) {
        return "Only admins are allowed to delete commands.";
      }
      commName = commSplit[1];
      let resDelete: string | Error = await db.deleteCommand(
        msg.invoker.uniqueIdentifier,
        commName
      );
      if (resDelete instanceof Error) {
        return resDelete.message;
      }
      return resDelete;

    case "!commands":
      let commsRes: string[] | Error = await db.getCommands();
      if (commsRes instanceof Error) {
        return commsRes.message;
      }
      return commsRes.join(` ; `);

    case "!botjoin":
      if (msg.targetmode !== TextMessageTargetMode.SERVER) {
        return "";
      }
      if (!isUserOwner(msg.invoker)) {
        return "Only the bot owner can ask the bot to join channels.";
      }
      return `!botjoin`;

    case "!ignorecmds":
      if (msg.targetmode !== TextMessageTargetMode.SERVER) {
        return "";
      }
      if (!isUserOwner(msg.invoker)) {
        return `Only the bot owner is allowed to send this command.`;
      }
      setIgnoreCMDs(true);
      return "Bot stopped accepting commands!";

    case "!acceptcmds":
      if (msg.targetmode !== TextMessageTargetMode.SERVER) {
        return "";
      }
      if (!isUserOwner(msg.invoker)) {
        return `Only the bot owner is allowed to send this command.`;
      }
      setIgnoreCMDs(false);
      return "Bot is now accepting commands!";

    default:
      let res: Command | Error = await db.getCommand(commName);
      if (res instanceof Error) {
        if (res.message.includes("undefined")) {
          return `Command ${commName} does not exist.`;
        }
        return res.message;
      }

      if (res.Userlevel === "anyone") {
        return res.Output;
      }

      if (res.Userlevel === "admin") {
        if (!isUserAdmin(msg.invoker)) {
          return `Only admins are allowed to call command ${commName}.`;
        }
        return res.Output;
      }

      return `Unknown error for output ${res.Output}.`;
  }
};

export default commandHandler;
