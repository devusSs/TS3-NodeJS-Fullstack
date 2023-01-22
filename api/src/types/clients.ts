import { Temporal } from "@js-temporal/polyfill";

export interface AddToken {
  OwnerName: string;
  Token: string;
  Timestamp: Temporal.PlainDateTime;
}

export interface GetToken {
  ID: number;
  OwnerName: string;
  Token: string;
  Timestamp: Temporal.PlainDateTime;
}
