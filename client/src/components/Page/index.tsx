import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { AppContext, AppContextType } from "../../context/app";

import MessagesList from "../MessagesList";
import UsersList from "../UsersList";

import "./index.scss";

export default function Page() {
  const { loggedIn, mainUser } = React.useContext(AppContext) as AppContextType;

  if (!loggedIn)
    return (
      <div className="d-flex h-100">
        <h6 className="mx-auto text-center justify-content-center align-self-center">
          Log in.
        </h6>
      </div>
    );

  return (
    <>
      <p>{mainUser}</p>
      <div className="main-window">
        <Container className="border main-container">
          <Row>
            <Col className="border left-column">
              <UsersList />
            </Col>
            <Col className="border right-column">
              <MessagesList />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
