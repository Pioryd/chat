import React from "react";

import useMessages, { Messages } from "../hooks/useMessages";
import useUsers, { Users } from "../hooks/useUsers";
import useWebSocket, { Packet } from "../hooks/useWebSocket";

export interface AppContextType {
  messages: Messages;
  users: Users;
  mainUser: string;
  targetUser: string;
  loggedIn: boolean;
  fn: {
    setMainUser: (name: string) => void;
    setTargetUser: (name: string) => void;
    setLoggedIn: (state: boolean) => void;
    send: (packetId: string, packetData?: any) => void;
  };
}

export const AppContext = React.createContext<AppContextType | {}>({});

const AppProvider: React.FC = ({ children }) => {
  const usersHook = useUsers();
  const messagesHook = useMessages();
  const webSocket = useWebSocket();

  const [mainUser, setMainUser] = React.useState(String(Date.now()));
  const [targetUser, setTargetUser] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const parse = (packet: Packet) => {
    const { packetId, packetData } = packet;

    if (packetId === "login") {
      setLoggedIn(true);
    } else if (packetId === "usersList") {
      const { users } = packetData;
      usersHook.update(users);
    } else if (packetId === "message") {
      const { from, text } = packetData;
      messagesHook.add(from, "received", text);
    }
  };

  const send = (packetId: string, packetData?: any) => {
    webSocket.send(packetId, packetData);

    if (packetId === "message") {
      messagesHook.add(targetUser, "sent", packetData.text);
    }
  };

  React.useEffect(() => {
    // Parse all messages
    for (const packet of webSocket.pop()) parse(packet);
  }, [webSocket.messages]);

  React.useEffect(() => {
    webSocket.connect({ packetId: "login", packetData: { name: mainUser } });
  }, [mainUser]);

  React.useEffect(() => {
    // Auto refresh users list
    const intervalId = setInterval(() => webSocket.send("usersList"), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const value: AppContextType = {
    messages: messagesHook.messages,
    users: usersHook.users,
    mainUser,
    targetUser,
    loggedIn,
    fn: {
      setMainUser,
      setTargetUser,
      setLoggedIn,
      send
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
