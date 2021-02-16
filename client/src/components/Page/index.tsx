import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { AppContext, AppContextType } from "../../context/app";

import TopBar from "../TopBar";
import LoginPanel from "../LoginPanel";
import ReconnectingPanel from "../ReconnectingPanel";
import MessagesList from "../MessagesList";
import UsersList from "../UsersList";

import "./index.scss";

export default function Page() {
  const { loggedIn, reconnecting } = React.useContext(
    AppContext
  ) as AppContextType;

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
                !reconnecting ? (
                  <LoginPanel />
                ) : (
                  <ReconnectingPanel />
                )
              ) : (
                <Row className="p-0 m-0">
                  <div className="content">
                    <div className="border left-column">
                      <UsersList />
                    </div>
                    <div className="border right-column">
                      <MessagesList />
                    </div>{" "}
                  </div>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
