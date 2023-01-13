import { Temporal } from "@js-temporal/polyfill";

export interface UserConnect {
  TSID: string;
  FirstUsername: string;
  LatestUsername: string;
  FirstIP: string;
  LatestIP: string;
  FirstConnection: Temporal.PlainDateTime;
  LatestConnection: Temporal.PlainDateTime;
  Country: string | undefined;
  Version: string;
  Platform: string;
  UniqueID: string;
}

export interface UserDisconnect {
  TSID: string | undefined;
  LatestUsername: string | undefined;
  LatestIP: string | undefined;
  LatestDisconnect: Temporal.PlainDateTime;
  Country: string | undefined;
  Version: string | undefined;
  Platform: string | undefined;
}
