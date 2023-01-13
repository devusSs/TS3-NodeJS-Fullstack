import { Temporal } from "@js-temporal/polyfill";

export enum Targetmode {
  CLIENT = "client",
  CHANNEL = "channel",
  SERVER = "server",
  UNKNOWN = "unknown or invalid",
}

export const convertTargetMode = (target: number): Targetmode => {
  switch (target) {
    case 1:
      return Targetmode.CLIENT;
    case 2:
      return Targetmode.CHANNEL;
    case 3:
      return Targetmode.SERVER;
    default:
      return Targetmode.UNKNOWN;
  }
};

export interface MessageAdd {
  InvokerNick: string;
  InvokerDBID: number;
  InvokerUID: string;
  InvokerIP: string;
  Message: string;
  Targetmode: Targetmode;
  DateTime: Temporal.PlainDateTime;
}
