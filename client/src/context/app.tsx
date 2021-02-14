import React from "react";

import { Messages } from "../hooks/useMessages";
import { Users } from "../hooks/useUsers";

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
