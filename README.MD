# Chat online

## Live preview: [DEMO](https://chat-305014.ew.r.appspot.com/)

## Build with

- **Server**: Express, WebSocket, TypeScript
- **Client**: React, WebSocket, Bootstrap, TypeScript

## Install and run

- Configure **.env** files for client and server, examples bellow.

**Client**
```bash
npm install
npm start
```

**Server**
```bash
npm install
npm run dev
```

## Client - example .env

In client root directory create:

- .env.development .env.production .env.test

```environment
REACT_APP_WS_URL=ws://localhost:8080
```

## Server - example .env

In server root directory create:

- .env.development .env.production .env.test

```environment
PORT=8080
WEB_SERVER=false
```
