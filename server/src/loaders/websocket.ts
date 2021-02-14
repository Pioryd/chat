import WebSocket from "ws";

import { Store, Packet } from "../protocol/types";

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
      console.log("Disconnected.");
    });

    webSocket.on("message", (data: string) => {
    });
  });
}
