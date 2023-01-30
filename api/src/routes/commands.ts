import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import { Command } from "../types/commands";
import requireAuth from "../middleware/requireAuth";

export const commandRoutes = express.Router();

commandRoutes.use(requireAuth);

commandRoutes.get("/", async (req: Request, res: Response) => {
  let commandName = req?.query?.name;
  let commandULevel = req?.query?.ulevel;

  let result: Command[] | Error = await req.app.get("db").getCommands();

  if (result instanceof Error) {
    let resp: ErrorResponse = {
      code: 500,
      error: { message: result.message },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    res.status(500).json(resp);
    return;
  }

  if (commandName !== undefined || commandULevel !== undefined) {
    if (commandName !== undefined && commandULevel !== undefined) {
      const filteredCommands = result.filter(
        (command) =>
          command.Name === commandName && command.Userlevel === commandULevel
      );

      if (filteredCommands.length === 0) {
        let resp: ErrorResponse = {
          code: 404,
          error: { message: "No corresponding commands found." },
          timestamp: Temporal.Now.plainDateTimeISO(),
        };
        return res.status(404).json(resp);
      }

      let resp: SuccessResponse = {
        code: 200,
        data: filteredCommands,
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(200).json(resp);
    }

    if (commandName !== undefined) {
      const filteredCommands = result.filter(
        (command) => command.Name === commandName
      );

      if (filteredCommands.length === 0) {
        let resp: ErrorResponse = {
          code: 404,
          error: { message: "No corresponding commands found." },
          timestamp: Temporal.Now.plainDateTimeISO(),
        };
        return res.status(404).json(resp);
      }

      let resp: SuccessResponse = {
        code: 200,
        data: filteredCommands,
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(200).json(resp);
    }

    if (commandULevel !== undefined) {
      const filteredCommands = result.filter(
        (command) => command.Userlevel === commandULevel
      );

      if (filteredCommands.length === 0) {
        let resp: ErrorResponse = {
          code: 404,
          error: { message: "No corresponding commands found." },
          timestamp: Temporal.Now.plainDateTimeISO(),
        };
        return res.status(404).json(resp);
      }

      let resp: SuccessResponse = {
        code: 200,
        data: filteredCommands,
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(200).json(resp);
    }
  } else {
    let resp: SuccessResponse = {
      code: 200,
      data: { result },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    res.status(200).json(resp);
  }
});
