import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import { User } from "../types/users";
import requireAuth from "../middleware/requireAuth";

export const userRoutes = express.Router();

userRoutes.use(requireAuth);

userRoutes.get("/", async (req: Request, res: Response) => {
  let result: User[] | Error = await req.app.get("db").getUsers();

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
});
