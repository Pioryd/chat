import React from "react";

export interface Packet {
  packetId: string;
  packetData: { [key: string]: any };
}
export default function useWebSocket() {
  const [webSocket, setWebSocket] = React.useState<WebSocket>();
  const [messages, setMessages] = React.useState<Packet[]>([]);
  const [packetOnReconnect, setPacketOnReconnect] = React.useState<Packet>();

  const pop = () => {
    if (messages.length === 0) return [];
    const returnMessages = [...messages];
    setMessages([]);
    return returnMessages;
  };

  const send = (packetId: string, packetData: any = {}) =>
    webSocket && webSocket.send(JSON.stringify({ packetId, packetData }));

  const connect = (packetOnConnected: Packet | undefined) => {
    if (packetOnConnected == null) return;

    const newWebSocket = new WebSocket(String(process.env.REACT_APP_WS_URL));
    if (newWebSocket == null) return;

    setPacketOnReconnect(packetOnConnected);

    newWebSocket.onopen = () => {
      console.log("Connected");

      // state webSocket will be set after event "onopen"
      newWebSocket.send(JSON.stringify(packetOnConnected));
    };
    newWebSocket.onmessage = (ev) =>
      setMessages([...messages, JSON.parse(ev.data)]);
    newWebSocket.onclose = () => {
      console.log("Disconnected");
      console.log("Reconnecting...");
      connect(packetOnReconnect);
    };

    setWebSocket(newWebSocket);
  };

  const disconnect = () => {
    if (webSocket) {
      webSocket.onopen = null;
      webSocket.onmessage = null;
      webSocket.onclose = null;
      webSocket.close();
    }
    setWebSocket(undefined);
  };

  React.useEffect(() => connect(packetOnReconnect), []);

  return { messages, send, pop, connect, disconnect };
}
