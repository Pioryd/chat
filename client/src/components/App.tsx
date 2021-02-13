import "./App.scss";

import AppProvider from "../context/app";

import Page from "./Page";

function App() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

export default App;
