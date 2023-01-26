import { Temporal } from "@js-temporal/polyfill";
import { SuccessResponse, ErrorResponse } from "../responses/responses";
import express, { Request, Response } from "express";
import { User } from "../types/users";
import requireAuth from "../middleware/requireAuth";

export const userRoutes = express.Router();

userRoutes.use(requireAuth);

userRoutes.get("/", async (req: Request, res: Response) => {
  let latestUsername = req.query?.lu;
  let uniqueID = req.query?.uid;

  if (latestUsername !== undefined || uniqueID !== undefined) {
    let result: User[] | Error = await req.app
      .get("db")
      .getUsersByLUOrUID(latestUsername, uniqueID);

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
        error: { message: "No corresponding user found." },
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
    let result: User[] | Error = await req.app.get("db").getUsers();

    if (result instanceof Error) {
      let resp: ErrorResponse = {
        code: 500,
        error: { message: result.message },
        timestamp: Temporal.Now.plainDateTimeISO(),
      };
      return res.status(500).json(resp);
    }

    let resp: SuccessResponse = {
      code: 200,
      data: { result },
      timestamp: Temporal.Now.plainDateTimeISO(),
    };
    return res.status(200).json(resp);
  }
});
