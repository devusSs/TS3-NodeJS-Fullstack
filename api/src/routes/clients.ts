import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

export const clientRoutes = express.Router();

// TODO: implement refresh token
const createToken = (username: string): string => {
  return jwt.sign({ username }, config.JWT_SECRET, { expiresIn: "20m" });
};

clientRoutes.post("/login", async (req: Request, res: Response) => {
  let body = req.body;
  if (body.username === undefined || body.password === undefined) {
    let resp: ErrorResponse = {
      code: 400,
      error: { message: "Missing username or password." },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(400).json(resp);
  }
  let username: string = body.username.trim();
  let password: string = body.password.trim();
  if (username !== config.LOGIN_USER || password !== config.LOGIN_PASS) {
    let resp: ErrorResponse = {
      code: 401,
      error: { message: "Invalid username or password." },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(401).json(resp);
  }
  const token = createToken(username);
  let resp: SuccessResponse = {
    code: 200,
    data: { username: username, token: token },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };
  res.status(200).json(resp);
});
