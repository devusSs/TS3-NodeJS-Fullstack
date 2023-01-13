import { Temporal } from "@js-temporal/polyfill";

export enum Targetmode {
  CLIENT = "client",
  CHANNEL = "channel",
  SERVER = "server",
  UNKNOWN = "unknown or invalid",
}

export interface Message {
  ID: number;
  InvokerNick: string;
  InvokerDBID: number;
  InvokerUID: string;
  InvokerIP: string;
  Message: string;
  Targetmode: Targetmode;
  DateTime: Temporal.PlainDateTime;
}
