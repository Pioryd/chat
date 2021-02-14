import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { AppContext, AppContextType } from "../../context/app";

import TopBar from "../TopBar";
import LoginPanel from "../LoginPanel";
import MessagesList from "../MessagesList";
import UsersList from "../UsersList";

import "./index.scss";

export default function Page() {
  const { loggedIn } = React.useContext(AppContext) as AppContextType;

  return (
    <>
      <div className="main-window">
        <Container className="border main-container p-0 m-0">
          <Row>
            <Col>
              <TopBar />
            </Col>
          </Row>
          <Row className="h-100">
            <Col>
              {!loggedIn ? (
                <LoginPanel />
              ) : (
                <Row className="p-0 m-0">
                  <Col className="border left-column">
                    <UsersList />
                  </Col>
                  <Col className="border right-column">
                    <MessagesList />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
