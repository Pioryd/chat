import WebSocket from "ws";

import validate from "../util/validate";

import * as send from "./send";
import { Store } from "./types";

export function login(webSocket: WebSocket, data: any, store: Store) {
  try {
    const { name } = data;

    validate({ name });

    if (store.users.findOnce({ name }) != null) {
      send.login(webSocket, {}, store);
      return;
    }

    store.users.updateOnce({ webSocket }, { name: data.name });

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

    const fromUserData = store.users.findOnce({ webSocket });

    validate({ name: to });
    validate({ name: fromUserData.name });
    validate({ message: text });

    const toUserData = store.users.findOnce({ name: to });
    if (!toUserData || !toUserData.webSocket)
      throw new Error(`User ${to} is not logged in.`);

    if (!fromUserData.name) throw new Error(`Message sender does not exist.`);

    send.message(toUserData.webSocket, { from: fromUserData.name, text });
  } catch (err) {
    console.log(err.message);
  }
}
