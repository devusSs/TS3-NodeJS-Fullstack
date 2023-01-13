export enum Userlevel {
  Anyone = "anyone",
  Admin = "admin",
}

export interface Command {
  ID: number;
  Name: string;
  Output: string;
  Userlevel: Userlevel;
  Added: any;
  UserAdded: string;
  Edited: any;
  UserEdited: string;
}
