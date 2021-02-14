import "./App.scss";

import { AppContext } from "../context/app";
import useApp from "../hooks/useApp";

import Page from "./Page";

function App() {
  const appValue = useApp();

  return (
    <AppContext.Provider value={appValue}>
      <Page />
    </AppContext.Provider>
  );
}

export default App;
