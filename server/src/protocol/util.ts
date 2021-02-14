import WebSocket from "ws";
import { Users } from "./types";

export function send(
  webSocket: WebSocket | undefined,
  packetId: string,
  packetData: any
) {
  if (webSocket && webSocket.readyState === WebSocket.OPEN)
    webSocket.send(JSON.stringify({ packetId, packetData }));
}

export function isLoggedIn(webSocket: WebSocket, users: Users) {
  return (
    Object.keys(users).filter((name) => users[name].webSocket === webSocket)
      .length > 0
  );
}
