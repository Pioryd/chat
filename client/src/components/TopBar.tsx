import React from "react";

import { Button } from "react-bootstrap";

import { AppContext, AppContextType } from "../context/app";

export default function TopBar() {
  const { fn, mainUser, loggedIn } = React.useContext(
    AppContext
  ) as AppContextType;

  const logout = () => fn.logout();

  return (
    <div
      className="bg-primary text-light text-center"
      style={{ height: "25px" }}
    >
      {loggedIn ? "Logged as " + mainUser : "Chat"}

      <Button
        hidden={!loggedIn}
        className="close pr-1 pl-1"
        aria-label="Logout"
        onClick={logout}
      >
        <span aria-hidden="true">&times;</span>
      </Button>
    </div>
  );
}
