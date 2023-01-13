import { Temporal } from "@js-temporal/polyfill";
import { ErrorResponse, SuccessResponse } from "../responses/responses";
import express, { Request, Response } from "express";

let botStatusLastHit: Temporal.PlainDateTime = Temporal.Now.plainDateTimeISO();
let botStatus: boolean = false;

const checkBotStatus = (): string => {
  if (botStatus === true) {
    return "Bot is up and running.";
  }
  return "Bot is currently down.";
};

export const invalidateBotStatus = (): void => {
  let timeNow = Temporal.Now.plainDateTimeISO();
  let diff = timeNow.since(botStatusLastHit);
  if (diff.seconds >= 5) {
    botStatus = false;
  }
};

export const defaultRoute = express.Router();

defaultRoute.get("/", (req: Request, res: Response) => {
  let succRes: SuccessResponse = {
    code: 200,
    data: { message: "Welcome to the TS3 Bot API!" },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };
  res.json(succRes);
});

defaultRoute.post("/status/accept", (req: Request, res: Response) => {
  let body = req.body;
  if (body.message !== "Hello from the Bot!") {
    let resp: ErrorResponse = {
      code: 400,
      error: { message: "Invalid body message." },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    res.status(400).json(resp);
    return;
  }
  botStatus = true;
  botStatusLastHit = Temporal.Now.plainDateTimeISO();
  let resp: SuccessResponse = {
    code: 200,
    data: { message: "Successfully updated status!" },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };
  res.status(200).json(resp);
});

defaultRoute.get("/status", (req: Request, res: Response) => {
  let botStatusReturn: string = checkBotStatus();
  let resp: SuccessResponse = {
    code: 200,
    data: { status: botStatusReturn },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };
  res.status(200).json(resp);
});
