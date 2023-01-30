import { Temporal } from "@js-temporal/polyfill";

export interface Event {
  ID: number;
  Type: string;
  Datetime: Temporal.PlainDateTime;
  Emitter: string;
  Status: number;
}
