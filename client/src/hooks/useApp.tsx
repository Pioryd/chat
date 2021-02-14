import React from "react";

import useMessages from "./useMessages";
import useUsers from "./useUsers";
import useWebSocket, { Packet } from "./useWebSocket";

export default function useApp() {
  const usersHook = useUsers();
  const messagesHook = useMessages();
  const webSocket = useWebSocket();

  const [mainUser, setMainUser] = React.useState("");
  const [targetUser, setTargetUser] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const parse = (packet: Packet) => {
    const { packetId, packetData } = packet;

    if (packetId === "login") {
      const { name } = packetData;
      setMainUser(name);
      setLoggedIn(true);
    } else if (packetId === "usersList") {
      const { users } = packetData;
      usersHook.update(users);
    } else if (packetId === "message") {
      const { from, text } = packetData;
      messagesHook.add(from, "received", text);
    }
  };

  const login = (data: { name: string }) =>
    webSocket.connect({ packetId: "login", packetData: data });

  const logout = () => {
    setMainUser("");
    setLoggedIn(false);
    webSocket.disconnect();
  };

  const message = (data: any) => {
    messagesHook.add(targetUser, "sent", data.text);
    webSocket.send("message", data);
  };

  React.useEffect(() => {
    // Parse all packets
    for (const packet of webSocket.pop()) parse(packet);
  }, [webSocket.messages]);

  React.useEffect(() => {
    // Auto refresh users list
    const intervalId = setInterval(() => webSocket.send("usersList"), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    messages: messagesHook.messages,
    users: usersHook.users,
    mainUser,
    targetUser,
    loggedIn,
    fn: {
      setMainUser,
      setTargetUser,
      setLoggedIn,
      login,
      logout,
      message
    }
  };
}
