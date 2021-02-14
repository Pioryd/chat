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
    login: (data: { name: string }) => void;
    logout: () => void;
    message: (data: { to: string; text: string }) => void;
  };
}

export const AppContext = React.createContext<AppContextType | {}>({});

const AppProvider: React.FC = ({ children }) => {
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
      login,
      logout,
      message
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
