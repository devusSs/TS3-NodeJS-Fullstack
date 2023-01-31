import { Temporal } from "@js-temporal/polyfill";
import express, { Request, Response } from "express";
import requireAuth from "../middleware/requireAuth";
import { ErrorResponse, SuccessResponse } from "../responses/responses";
import { Event } from "../types/events";

export const adminRoutes = express.Router();

// TODO: re-enable
//adminRoutes.use(requireAuth);

adminRoutes.get("/events", async (req: Request, res: Response) => {
  let eventType = req?.query?.et;
  let eventEmitter = req?.query?.em;

  let result: Event[] | Error = await req.app.get("db").getEvents();

  if (result instanceof Error) {
    let resp: ErrorResponse = {
      code: 500,
      error: { message: result.message },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(500).json(resp);
  }

  if (eventType !== undefined || eventEmitter !== undefined) {
    if (eventType !== undefined && eventEmitter !== undefined) {
      const filteredEvents = result.filter(
        (event) => event.Type === eventType && event.Emitter === eventEmitter
      );

      if (filteredEvents.length === 0) {
        let resp: ErrorResponse = {
          code: 404,
          error: { message: "No corresponding events found." },
          timestamp: Temporal.Now.plainDateTimeISO(),
        };
        return res.status(404).json(resp);
      }

      let resp: SuccessResponse = {
        code: 200,
        data: filteredEvents,
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(200).json(resp);
    }

    if (eventType !== undefined) {
      const filteredEvents = result.filter((event) => event.Type === eventType);

      if (filteredEvents.length === 0) {
        let resp: ErrorResponse = {
          code: 404,
          error: { message: "No corresponding events found." },
          timestamp: Temporal.Now.plainDateTimeISO(),
        };
        return res.status(404).json(resp);
      }

      let resp: SuccessResponse = {
        code: 200,
        data: filteredEvents,
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(200).json(resp);
    }

    if (eventEmitter !== undefined) {
      const filteredEvents = result.filter(
        (event) => event.Emitter === eventEmitter
      );

      if (filteredEvents.length === 0) {
        let resp: ErrorResponse = {
          code: 404,
          error: { message: "No corresponding events found." },
          timestamp: Temporal.Now.plainDateTimeISO(),
        };
        return res.status(404).json(resp);
      }

      let resp: SuccessResponse = {
        code: 200,
        data: filteredEvents,
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(200).json(resp);
    }
  } else {
    let resp: SuccessResponse = {
      code: 200,
      data: result,
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(200).json(resp);
  }
});
