import WebSocket from "ws";
import { Express } from "express";

export interface Store {
  app?: Express;
  server?: any;
  webSocketServer?: WebSocket.Server;
  users: Users;
  data: any;
}

export interface User {
  webSocket: WebSocket;
}

export interface Users {
  [key: string]: User;
}

export interface Packet {
  packetId: string;
  packetData: any;
}
