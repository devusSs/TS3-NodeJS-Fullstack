import { Temporal } from "@js-temporal/polyfill";

export interface SuccessResponse {
  code: number;
  data: object;
  timestamp: Temporal.PlainDateTime;
}

export interface ErrorResponse {
  code: number;
  error: object;
  timestamp: Temporal.PlainDateTime;
}
