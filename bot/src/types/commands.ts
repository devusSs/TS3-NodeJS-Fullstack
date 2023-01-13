import { Temporal } from "@js-temporal/polyfill";

export enum Userlevel {
  Anyone = "anyone",
  Admin = "admin",
}

export interface Command {
  ID: number;
  Name: string;
  Output: string;
  Userlevel: Userlevel;
  Added: Temporal.PlainDateTime;
  UserAdded: string;
  Edited: Temporal.PlainDateTime;
  UserEdited: string;
}

export interface CommandAdd {
  Name: string;
  Output: string;
  Userlevel: Userlevel;
  Added: Temporal.PlainDateTime;
  UserAdded: string;
}

export interface CommandEdit {
  Name: string;
  Output: string;
  Userlevel: Userlevel;
  Edited: Temporal.PlainDateTime;
  UserEdited: string;
}
