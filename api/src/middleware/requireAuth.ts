import { Temporal } from "@js-temporal/polyfill";
import { NextFunction } from "express";
import { ErrorResponse } from "../responses/responses";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization }: any = req.headers;

  if (!authorization) {
    let resp: ErrorResponse = {
      code: 401,
      error: { message: "missing auth token" },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(401).json(resp);
  }

  const token = authorization.split(" ")[1];

  try {
    const { username }: any = jwt.verify(token, config.JWT_SECRET);
    if (username !== config.LOGIN_USER || username !== config.BOT_LOGIN) {
      let resp: ErrorResponse = {
        code: 401,
        error: { message: "Unauthorized request" },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(401).json(resp);
    }
    next();
  } catch (err) {
    console.log(`Error verifying token: ${err}`);
    let resp: ErrorResponse = {
      code: 403,
      error: { message: "Unauthorized request" },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(403).json(resp);
  }
};

export default requireAuth;
