import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import { Message } from "../types/messages";
import requireAuth from "../middleware/requireAuth";

export const messagesRoutes = express.Router();

messagesRoutes.use(requireAuth);

messagesRoutes.get("/", async (req: Request, res: Response) => {
  let result: Message[] | Error = await req.app.get("db").getMessages();

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
