import WebSocket from "ws";
import { Express } from "express";

export interface Store {
  app?: Express;
  server?: any;
  webSocketServer?: WebSocket.Server;
}

}
