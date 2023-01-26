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

  if (commandName !== undefined || commandULevel !== undefined) {
    let result: Command[] | Error = await req.app
      .get("db")
      .getCommandsByNameOrUserlevel(commandName, commandULevel);

    if (result instanceof Error) {
      let resp: ErrorResponse = {
        code: 500,
        error: { message: result.message },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      res.status(500).json(resp);
      return;
    }

    if (result.length === 0) {
      let resp: ErrorResponse = {
        code: 404,
        error: { message: "No corresponding command found." },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(404).json(resp);
    }

    let resp: SuccessResponse = {
      code: 200,
      data: { result },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    res.status(200).json(resp);
  } else {
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

    let resp: SuccessResponse = {
      code: 200,
      data: { result },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    res.status(200).json(resp);
  }
});
