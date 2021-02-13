import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import MessagesList from "../MessagesList";
import UsersList from "../UsersList";

import "./index.scss";

export default function Page() {
  return (
    <>
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
