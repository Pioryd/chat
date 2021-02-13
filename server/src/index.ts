import { Store } from "./protocol/types";

import * as env from "./loaders/env";
import * as express from "./loaders/express";
const store: Store = {};

env.load();
express.load(store);
