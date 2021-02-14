import WebSocket from "ws";

import { Store, Packet } from "../protocol/types";
import * as parse from "../protocol/parse";
import * as send from "../protocol/send";

export function load(store: Store) {
  store.server = require("http").createServer(store.app);
  store.webSocketServer = new WebSocket.Server({ server: store.server });

  store.server.listen(process.env.PORT, function () {
    console.log(
      `[${process.env.NODE_ENV}]Server is running on port: ${process.env.PORT}`
    );
  });

  store.webSocketServer.on("connection", function (webSocket) {
    const ipv6 = (<any>webSocket)._socket.address().address;
    console.log("New connection: " + ipv6);

    webSocket.on("close", () => {
      send.logout(webSocket, store);
      console.log("Disconnected.");
    });

    webSocket.on("message", (data: string) => {
      const { packetId, packetData } = JSON.parse(data) as Packet;
      if (packetId in <any>parse)
        (<any>parse)[packetId](webSocket, packetData, store);
    });
  });
}
