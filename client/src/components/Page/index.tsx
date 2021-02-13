import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import "./index.scss";

export default function Page() {
  return (
    <>
      <div className="main-window">
        <Container className="border main-container">
          <Row>
            <Col className="border left-column"></Col>
            <Col className="border right-column"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
