import {
  ClientConnectEvent,
  TeamSpeak,
  TextMessageTargetMode,
} from "ts3-nodejs-library";
import config from "../config/config";

export const handleAcceptTOS = (
  teamspeak: TeamSpeak,
  e: ClientConnectEvent
) => {
  teamspeak.sendTextMessage(
    e.client.clid,
    TextMessageTargetMode.CLIENT,
    `Hello ${e.client.nickname}! By using this TeamSpeak 3 server you accept the following terms of use:`
  );
  teamspeak.sendTextMessage(
    e.client.clid,
    TextMessageTargetMode.CLIENT,
    `${config.FRONTEND_URL}/tos`
  );
  teamspeak.sendTextMessage(
    e.client.clid,
    TextMessageTargetMode.CLIENT,
    "If you do not agree to the terms of use please disconnect immediatly!"
  );
};
