import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { AppContext, AppContextType } from "../../context/app";

import LoginPanel from "../LoginPanel";
import MessagesList from "../MessagesList";
import UsersList from "../UsersList";

import "./index.scss";

export default function Page() {
  const { loggedIn, mainUser } = React.useContext(AppContext) as AppContextType;

  return (
    <>
      <p>TopBar: {mainUser}</p>
      <div className="main-window">
        <Container className="border main-container">
          {!loggedIn ? (
            <LoginPanel />
          ) : (
            <Row>
              <Col className="border left-column">
                <UsersList />
              </Col>
              <Col className="border right-column">
                <MessagesList />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}
