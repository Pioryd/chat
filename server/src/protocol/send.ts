import WebSocket from "ws";

import { Store } from "./types";
import { send } from "./util";

// Args order:
//  webSocket -> data -> store

export function logout(webSocket: WebSocket, store: Store) {
  const { users } = store;

  const name = Object.keys(users).filter(
    (key) => users[key].webSocket === webSocket
  )[0];
  if (name != null) delete users[name];

  usersListToEveryOne(store);
}

export function login(webSocket: WebSocket, store: Store) {
  send(webSocket, "login", {});
}

export function message(
  webSocket: WebSocket,
  data: {
    from: string;
    text: string;
  }
) {
  send(webSocket, "message", data);
}

export function usersList(webSocket: WebSocket, store: Store) {
  send(webSocket, "usersList", { users: Object.keys(store.users) });
}

export function usersListToEveryOne(store: Store) {
  const { users } = store;

  // For everyone
  for (const [name, user] of Object.entries(users)) {
    if (user.webSocket.readyState !== WebSocket.OPEN) continue;

    send(user.webSocket, "usersList", {
      users: Object.keys(users).filter((value) => value !== name)
    });
  }
}
