import { TeamSpeakClient } from "ts3-nodejs-library";
import config from "../config/config";

export const isUserAdmin = (client: TeamSpeakClient): boolean => {
  if (
    client.servergroups.includes("6") ||
    client.uniqueIdentifier === config.OWNERUID
  ) {
    return true;
  }
  return false;
};

export const isUserOwner = (client: TeamSpeakClient): boolean => {
  if (client.uniqueIdentifier === config.OWNERUID) {
    return true;
  }
  return false;
};
