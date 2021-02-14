import WebSocket from "ws";

import validate from "../util/validate";

import * as send from "./send";
import { Store } from "./types";

export function login(webSocket: WebSocket, data: any, store: Store) {
  try {
    const { name } = data;
    const { users } = store;

    validate({ name });

    if (users[name] == null) users[name] = { webSocket };

    if (users[name].webSocket != webSocket)
      throw new Error(`User with same name[${name}] is already logged in.`);

    if (webSocket.readyState === WebSocket.OPEN)
      send.login(webSocket, { name }, store);

    send.usersListToEveryOne(store);
  } catch (err) {
    console.log(err.message);
  }
}

export function usersList(webSocket: WebSocket, data: any, store: Store) {
  try {
    send.usersList(webSocket, store);
  } catch (err) {
    console.log(err.message);
  }
}

export function message(webSocket: WebSocket, data: any, store: Store) {
  try {
    const { to, text } = data;
    const { users } = store;

    let from = Object.keys(users).filter(
      (name) => users[name].webSocket === webSocket
    )[0];

    validate({ name: to });
    validate({ name: from });
    validate({ message: text });

    if (users[to] == null) return;
    if (from == null) return;

    send.message(users[to].webSocket, { from, text });
  } catch (err) {
    console.log(err.message);
  }
}
