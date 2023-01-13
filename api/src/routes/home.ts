import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse } from "../responses/responses";
import express, { Request, Response } from "express";

export const defaultRoute = express.Router();

defaultRoute.get("/", (req: Request, res: Response) => {
  let succRes: SuccessResponse = {
    code: 200,
    data: { message: "Welcome to the TS3 Bot API!" },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };
  res.json(succRes);
});

defaultRoute.get("/status", (req: Request, res: Response) => {
  // TODO: implement actual check
  res.status(200).send("Bot up and running!");
});
