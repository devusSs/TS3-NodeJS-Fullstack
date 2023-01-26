import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";
import { AddToken, GetToken } from "../types/clients";

export const clientRoutes = express.Router();

const refreshTokenExpiry = 604800 * 1000; // 7 days
const authTokenExpiry = 1200 * 1000; // 20 min

const createToken = (username: string): string => {
  return jwt.sign({ username }, config.JWT_SECRET, { expiresIn: "20m" });
};

const createRefreshToken = (username: string): string => {
  return jwt.sign({ username }, config.REFRESH_SECRET);
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
    data: { username: username, token: token, expires_in: authTokenExpiry },
    timestamp: Temporal.Now.plainDateTimeISO(),
  };

  const refreshToken = createRefreshToken(username);

  let tokenAdd: AddToken = {
    OwnerName: username,
    Token: refreshToken,
    Timestamp: Temporal.Now.plainDateTimeISO(),
  };

  await req.app.get("db").addRefreshToken(tokenAdd);

  setTimeout(async () => {
    await req.app.get("db").deleteRefreshToken(username);
  }, refreshTokenExpiry);

  if (config.DEV_MODE === 0) {
    res
      .cookie("token", refreshToken, {
        httpOnly: true,
        secure: true,
        domain: config.FRONTEND_URL,
        path: "/",
        expires: new Date(Number(new Date()) + 1200 * 1000),
      })
      .json(resp);
  } else {
    res
      .cookie("token", refreshToken, {
        httpOnly: true,
        path: "/",
        expires: new Date(Number(new Date()) + 1200 * 1000),
      })
      .json(resp);
  }
});

clientRoutes.get("/refresh", async (req: Request, res: Response) => {
  let cookies = req.cookies;
  let refreshToken = cookies.token;

  if (!refreshToken) {
    let resp: ErrorResponse = {
      code: 401,
      error: { message: "Missing token" },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(401).json(resp);
  }

  try {
    const { username }: any = jwt.verify(refreshToken, config.REFRESH_SECRET);

    let dbReturn: GetToken = await req.app.get("db").getRefreshToken(username);

    if (dbReturn.OwnerName !== config.LOGIN_USER) {
      let resp: ErrorResponse = {
        code: 404,
        error: { message: "User not found" },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(404).json(resp);
    }

    let token = createToken(username);

    let resp: SuccessResponse = {
      code: 200,
      data: { username: username, token: token, expires_at: authTokenExpiry },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof Error) {
      let resp: ErrorResponse = {
        code: 400,
        error: { message: "Invalid token provided" },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(400).json(resp);
    }
  }
});

clientRoutes.delete("/logout", async (req: Request, res: Response) => {
  let cookies = req.cookies;
  let refreshToken = cookies.token;

  try {
    const { username }: any = jwt.verify(refreshToken, config.REFRESH_SECRET);

    await req.app.get("db").deleteRefreshToken(username);

    let resp: SuccessResponse = {
      code: 204,
      data: {},
      timestamp: Temporal.Now.plainDateTimeISO(),
    };

    if (config.DEV_MODE === 0) {
      res
        .clearCookie("token", { domain: config.FRONTEND_URL, path: "/" })
        .status(204)
        .json(resp);
    } else {
      res.clearCookie("token", { path: "/" }).status(204).json(resp);
    }
  } catch (err) {
    if (err instanceof Error) {
      let resp: ErrorResponse = {
        code: 400,
        error: { message: "Invalid token provided" },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(400).json(resp);
    }
  }
});
