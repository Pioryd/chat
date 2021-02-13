import React from "react";

export type MessageType = "received" | "sent";
export interface Messages {
  [key: string]: {
    type: MessageType;
    message: string;
  }[];
}

export default function useMessages() {
  const [messages, setMessages] = React.useState<Messages>({});

  const add = (user: string, type: MessageType, message: string) => {
    if (!Array.isArray(messages[user])) messages[user] = [];

    messages[user].push({ type, message });
    setMessages({ ...messages });
  };

  const remove = (user: string) => {
    delete messages[user];
    setMessages({ ...messages });
  };

  return { messages, add, remove };
}
