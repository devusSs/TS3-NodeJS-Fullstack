import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import { Message } from "../types/messages";
import requireAuth from "../middleware/requireAuth";

export const messagesRoutes = express.Router();

messagesRoutes.use(requireAuth);

// TODO: add filter by sent date
messagesRoutes.get("/", async (req: Request, res: Response) => {
  let invokerUID = req?.query?.uid;
  let targetmode = req?.query?.tm;

  if (invokerUID !== undefined || targetmode !== undefined) {
    let result: Message[] | Error = await req.app
      .get("db")
      .getMessagesByUIDOrTargetmode(invokerUID, targetmode);

    if (result instanceof Error) {
      let resp: ErrorResponse = {
        code: 500,
        error: { message: result.message },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(500).json(resp);
    }

    if (result.length === 0) {
      let resp: ErrorResponse = {
        code: 404,
        error: { message: "No corresponding message found." },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(404).json(resp);
    }

    let resp: SuccessResponse = {
      code: 200,
      data: { result },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(200).json(resp);
  } else {
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
  }
});
