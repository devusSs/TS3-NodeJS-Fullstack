import { Temporal } from "@js-temporal/polyfill";

export interface User {
  ID: number;
  TSID: number;
  FirstUsername: string;
  LatestUsername: string;
  FirstIP: string;
  LatestIP: string;
  FirstConnection: Temporal.PlainDateTime;
  LatestConnection: Temporal.PlainDateTime;
  LatestDisconnect: Temporal.PlainDateTime;
  Country: string;
  Version: string;
  Platform: string;
  UniqueID: string;
}
