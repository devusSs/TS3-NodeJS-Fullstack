import { Temporal } from "@js-temporal/polyfill";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { ErrorResponse, SuccessResponse } from "../responses/responses";

export const botRoutes = express.Router();

const createBotToken = (username: string): string => {
  return jwt.sign({ username }, config.JWT_SECRET, { expiresIn: "20m" });
};

botRoutes.post("/login", (req: Request, res: Response) => {
  let body = req.body;

  let username = body?.username;
  let password = body?.password;

  if (username === undefined || password === undefined) {
    let resp: ErrorResponse = {
      code: 400,
      error: { message: "Missing username or password." },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(400).json(resp);
  }

  if (username !== config.BOT_LOGIN || password !== config.BOT_PASS) {
    let resp: ErrorResponse = {
      code: 401,
      error: { message: "Invalid username or password." },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(401).json(resp);
  }

  let token = createBotToken(username);

  let resp: SuccessResponse = {
    code: 200,
    data: {
      username: username,
      expires_in: 1200 * 1000,
      token: token,
    },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };

  return res.status(200).json(resp);
});
