import React from "react";

export type MessageType = "received" | "sent";
export interface Messages {
  [key: string]: {
    type: MessageType;
    message: string;
    time: Date;
  }[];
}

export default function useMessages() {
  const [messages, setMessages] = React.useState<Messages>({});

  const clear = () => setMessages({});

  const add = (user: string, type: MessageType, message: string) => {
    if (!Array.isArray(messages[user])) messages[user] = [];

    messages[user].push({ type, message, time: new Date() });
    setMessages({ ...messages });
  };

  const remove = (users: string[]) => {
    if (users.length === 0) return;

    for (const user of users) delete messages[user];
    setMessages({ ...messages });
  };

  return { messages, add, remove, clear };
}
