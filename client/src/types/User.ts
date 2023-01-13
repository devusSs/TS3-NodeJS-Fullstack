import { Temporal } from "@js-temporal/polyfill";

export interface User {
  ID: number;
  TSID: number;
  FirstUsername: string;
  LatestUsername: string;
  FirstIP: string;
  LatestIP: string;
  FirstConnection: any;
  LatestConnection: any;
  LatestDisconnect: any;
  Country: string;
  Version: string;
  Platform: string;
  UniqueID: string;
}
